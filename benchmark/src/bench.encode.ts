import {add, complete, cycle, save, suite} from 'benny';
import {Entry, Fixture} from './types';

export = (fixture: Fixture, entries: Entry[], {version}: {version: string}) => {
  const fns = entries
    .filter(entry => entry.encode)
    .map(entry => add(`${entry.name}`, () => (entry.encoded = entry.encode!(fixture.data))));

  return suite(
    'Encode',
    ...fns,
    cycle(),
    complete(),
    save({file: 'encode', version: version}),
    save({file: 'encode', format: 'chart.html'}),
  );
};
