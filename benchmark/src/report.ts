import {Summary} from 'benny/lib/internal/common-types';
import {markdownTable} from './markdown-table';
import {numberWithCommas} from './utils';
import {Entry} from './types';
import {assert} from 'ts-essentials';

export function reportSummary(summary: Summary) {
  return markdownTable(
    [
      ['Library', 'Speed (ops/s)', '% Slower'],
      ...summary.results
        .sort((a, b) => b.ops - a.ops)
        .map(r => [r.name, numberWithCommas(r.ops) + ' ops/s', r.percentSlower ? r.percentSlower + '%' : '-']),
    ],
    {
      align: ['l', 'r', 'r'],
    },
  );
}

export function reportEncodedSize(entries: Entry[]) {
  const jsonSize = entries.find(e => e.name.toLowerCase() === 'json')?.encoded?.length;
  assert(typeof jsonSize === 'number', 'bench JSON is not found');

  const summary = entries.map(e => {
    const size = e.encoded!.length;
    return {
      name: e.name,
      size: e.encoded!.length,
      percentOfJson: Math.round((size * 100) / jsonSize),
    };
  });

  return markdownTable(
    [
      ['Library', 'Size (B)', '% of JSON'],
      ...summary.sort((a, b) => a.size - b.size).map(s => [s.name, s.size + ' B', s.percentOfJson + '%']),
    ],
    {
      align: ['l', 'r', 'r'],
    },
  );
}
