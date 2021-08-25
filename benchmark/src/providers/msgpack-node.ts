import {Entry, skip} from '../types';
import {tryImport} from '../utils';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('msgpack');

  // comment below to enable it
  return skip('msgpack-node', 'Much slower than others');

  if (!provider) {
    return skip('msgpack-node');
  }

  return {
    name: 'msgpack-node',
    encode: provider.pack,
    decode: provider.unpack,
  };
};
