import {log, osinfo} from './utils';
import {Providers} from './providers';
import {prepare} from './prepare';
import {reportEncodedSize, reportSummary} from './report';

const pkg = require('binio/package.json');

export async function run(fixtureName = 'player') {
  log('Benchmarking ...', {footer: '='});

  const fixture = {
    name: fixtureName,
    data: require(`./fixtures/${fixtureName}`),
  };

  const providers = new Providers();
  let entries = await providers.loadAndPrepare(fixture)

  log('Pre-Checking', {footer: '-'});
  entries = await prepare(fixture, entries);

  const summaries = [
    await require('./bench.encode')(fixture, entries, pkg),
    await require('./bench.decode')(fixture, entries, pkg),
  ];

  summaries.forEach(s => {
    console.log(' ');
    log(s.name, {footer: '-'});
    console.log(reportSummary(s));
  });

  console.log(' ');
  log('Encode Size', {footer: '-'});
  console.log(reportEncodedSize(entries));

  console.log(' ');
  console.log(osinfo());
}

run().catch(console.error);
