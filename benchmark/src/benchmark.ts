import {expect} from '@loopback/testlab';
import {assert, DeepRequired} from 'ts-essentials';
import {Event, Suite, Target} from 'benchmark';
import ora from 'ora';
import flatten from 'tily/array/flatten';
import {markdownTable} from './markdown-table';
import {Providers} from './providers';
import {inspect, log, numberWithCommas, osinfo} from './utils';
import {Entry} from './types';

type Operation = 'encode' | 'decode';

interface Bench {
  operation: Operation;
  suite: Suite;
  fastest: Suite;
}

interface Score {
  name: string;
  encode: number;
  encodePercentOfMax: number;
  decode: number;
  decodePercentOfMax: number;
  size: number;
  sizePercentOfStandard: number;
}

type Scores = Score[];

async function precheck(fixture: {name: string; data: any}, entries: Entry[]) {
  for (const entry of entries) {
    const spinner = ora();
    spinner.start(`Checking ${entry.name}`);

    // await oraPromise(async () => {
    //   if (entry.skip) {
    //     return {warn: `Skip ${entry.name}. ${entry.skip}`};
    //   }
    //
    //   const encoded = entry.encoded ?? entry.encode?.(fixture.data);
    //   if (!encoded) {
    //     throw new Error(`Ignore ${entry.name}. It has no encoded data and encode function.`);
    //   }
    //
    //   const decoded = entry.decode?.(encoded);
    //   const real = JSON.parse(JSON.stringify(decoded));
    //   expect(real).containDeep(fixture.data);
    //   return `Checked ${entry.name}`;
    //
    // }, `Checking ${entry.name}`);

    if (entry.skip) {
      spinner.warn(`Skip ${entry.name}. ${entry.skip}`);
      continue;
    }

    const encoded = entry.encoded ?? entry.encode?.(fixture.data);
    if (!encoded) {
      throw new Error(`Ignore ${entry.name}. It has no encoded data and encode function.`);
    }

    const decoded = entry.decode?.(encoded);
    const real = JSON.parse(JSON.stringify(decoded));
    expect(real).containDeep(fixture.data);
  }
}

export async function run(fixtureName: string) {
  log('Benchmarking ...', {footer: '='});

  const fixture = {
    name: fixtureName,
    data: require(`./fixtures/${fixtureName}`),
  };

  const providers = new Providers();
  const entries = await providers.loadAndPrepare(fixture);

  log('Pre-Checking', {footer: '-'});
  // pre-check
  await precheck(fixture, entries);

  log();
  log('Pre-Check Complete!');

  const benches: Bench[] = [];

  let suite: Suite;

  // Encode benchmark
  log();
  suite = new Suite();
  entries
    .filter(entry => entry.encode)
    .forEach(entry => suite.add(`${entry.name}`, () => (entry.encoded = entry.encode!(fixture.data))));
  benches.push(runSuite('encode', suite));

  // Decode benchmark
  log();
  suite = new Suite();
  entries
    .filter(entry => entry.decode)
    .forEach(entry => suite.add(`${entry.name}`, () => entry.decode!(entry.encoded!)));
  benches.push(runSuite('decode', suite));

  // Calculate scores
  const scores = calculate(benches, entries as any);

  // Render Summary Text
  log();
  log('Benchmark Summary', {header: '=', footer: '=', indent: 1});
  log();
  console.log(renderScoresText(scores));

  // Print os info
  log();
  console.log('All benchmarks were performed on', osinfo());

  // Render Speed in chart
  const speedChart = {
    type: 'horizontalBar',
    data: renderSpeedScoresQuickChartData(scores),
    options: {
      title: {
        display: true,
        text: 'Speed (op/s) - longer is better',
      },
      plugins: {
        tickFormat: {
          suffix: 'k',
        },
      },
      scales: {xAxes: [{ticks: {callback: (value: number) => value.toLocaleString()}}]},
    },
  };
  const speedChartUrl = `https://quickchart.io/chart?c=${inspect(speedChart)}`;
  log();
  log('Open link below to show the encoding and decoding speed in chart', {footer: '-'});
  // log(terminalLink('Speed Benchmark Chart', speedChartUrl));
  log(speedChartUrl);

  // Render Byte count in chart
  const sizeChart = {
    type: 'horizontalBar',
    data: renderByteCountScoresQuickChartData(scores),
    options: {
      title: {
        display: true,
        text: 'Size - shorter is better',
      },
      plugins: {
        tickFormat: {
          suffix: 'B',
        },
      },
    },
  };
  const sizeChartUrl = `https://quickchart.io/chart?c=${inspect(sizeChart)}`;
  log();
  log('Open link below to show the encode byte count in chart', {footer: '-'});
  // log(terminalLink('Size Benchmark Chart', sizeChartUrl));
  log(sizeChartUrl);
}

function runSuite(operation: Operation, suite: Suite) {
  log(`Benchmarking "${operation}"`, {footer: '-'});
  suite
    .on('cycle', (event: Event) => {
      console.log(String(event.target));
    })
    .run({async: false, minTime: 0.01, minSamples: 0});
  return {operation, suite, fastest: suite.filter('fastest')};
}

function calculate(benches: Bench[], entries: DeepRequired<Entry>[]): Scores {
  const players = [...new Set<string>(flatten(benches.map(r => r.suite.map((t: Target) => t.name))))];
  const encodes = benches.find(r => r.operation.toLowerCase() === 'encode')?.suite?.map((t: Target) => t);
  const decodes = benches.find(r => r.operation.toLowerCase() === 'decode')?.suite?.map((t: Target) => t);
  assert(encodes);
  assert(decodes);

  const encodeFastest = encodes.reduce((answer, value) => (value.hz > answer ? value.hz : answer), 0);
  const decodeFastest = decodes.reduce((answer, value) => (value.hz > answer ? value.hz : answer), 0);
  const standardCount = entries.find(e => e.name.toLowerCase() === 'json')?.encoded.length;
  assert(encodeFastest > 0, 'encode fastest should be greater than 0');
  assert(decodeFastest > 0, 'decode fastest should be greater than 0');
  assert(standardCount, 'Can not find "json" benchmark data');

  return players
    .map(name => {
      const et = encodes.find(t => t.name === name);
      const dt = decodes.find(t => t.name === name);
      const count = entries.find(e => e.name === name)?.encoded.length;
      assert(count, `"${name}" missing encoded data`);
      const encode = Math.round(et?.hz ?? 0);
      const decode = Math.round(dt?.hz ?? 0);
      const encodePercentOfMax = Math.round((encode / encodeFastest) * 100);
      const decodePercentOfMax = Math.round((decode / decodeFastest) * 100);
      const countPercentOfStandard = Math.round((count / standardCount) * 100);
      return {
        name,
        encode,
        encodePercentOfMax,
        decode,
        decodePercentOfMax,
        size: count,
        sizePercentOfStandard: countPercentOfStandard,
      };
    })
    .sort((a, b) => b.encode - a.encode);
}

function renderScoresText(scores: Score[]) {
  return markdownTable(
    [
      [
        'Library',
        'Encode <br> speed',
        'Encode <br> % of max',
        'Decode <br> speed',
        'Decode <br> % of max',
        'Size',
        'Size <br> % of json',
      ],
      ...scores.map(score => [
        score.name,
        score.encode ? numberWithCommas(Math.round(score.encode / 1000)) + ' kop/s' : '-',
        score.encode ? score.encodePercentOfMax + '%' : '-',
        score.decode ? numberWithCommas(Math.round(score.decode / 1000)) + ' kops' : '-',
        score.decode ? score.decodePercentOfMax + '%' : '-',
        numberWithCommas(score.size) + 'B',
        score.sizePercentOfStandard + '%',
      ]),
    ],
    {
      align: ['l', 'r', 'r', 'r', 'r', 'r', 'r'],
    },
  );
}

function renderSpeedScoresQuickChartData(scores: Score[]) {
  // const items = scores.sort((a, b) => b.encode - a.encode);
  const labels = scores.map(score => score.name);
  const datasets = [
    {
      label: 'Encode',
      data: scores.map(score => Math.round(score.encode / 1000)),
    },
    {
      label: 'Decode',
      data: scores.map(score => Math.round(score.decode / 1000)),
    },
  ];
  return {labels, datasets};
}

function renderByteCountScoresQuickChartData(scores: Score[]) {
  const items = scores.sort((a, b) => a.size - b.size);
  const labels = items.map(score => score.name);
  const datasets = [
    {
      label: 'Binary size',
      data: items.map(score => score.size),
    },
  ];
  return {labels, datasets};
}
