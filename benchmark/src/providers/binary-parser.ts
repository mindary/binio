import {tryImport} from '../utils';
import {Definition, Entry, Fixture, skip} from '../types';

export = async function prepare(fixture: Fixture, definition?: Definition): Promise<Entry> {
  const provider = await tryImport('binary-parser');

  if (!provider || !definition) {
    return skip('binary-parser');
  }

  return {
    name: 'binary-parser',
    encoded: definition.encoded,
    decode: data => definition.schema.parse(data),
  };
};
