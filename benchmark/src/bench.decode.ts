import {add, complete, cycle, save, suite} from 'benny';
import {Entry, Fixture} from './types';

export = (fixture: Fixture, entries: Entry[], {version}: {version: string}) => {
  const fns = entries
    .filter(entry => entry.decode)
    .map(entry => add(`${entry.name}`, () => entry.decode!(entry.encoded!)));

  return suite(
    'Decode',
    ...fns,
    cycle(),
    complete(),
    save({file: 'decode', version: version}),
    save({file: 'decode', format: 'chart.html'}),
  );
};
