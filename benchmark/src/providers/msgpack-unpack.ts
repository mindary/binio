import {tryImport} from '../utils';
import {Definition, Entry, Fixture, skip} from '../types';
import {pack} from 'msgpackr';

export = async function prepare(fixture: Fixture, definition?: Definition): Promise<Entry> {
  const provider = await tryImport('msgpack-unpack');

  // comment below to enable it
  return skip('msgpack-node', 'Much slower than others');

  if (!provider) {
    return skip('msgpack-unpack');
  }

  return {
    name: 'msgpack-unpack',
    encoded: pack(fixture.data),
    decode: provider,
  };
};
