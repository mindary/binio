import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('msgpack-lite');

  // comment below to enable it
  return skip('msgpack-lite', 'Much slower than others');

  if (!provider) {
    return skip('msgpack-lite');
  }

  return {
    name: 'msgpack-lite',
    encode: provider.encode,
    decode: provider.decode,
  };
};
