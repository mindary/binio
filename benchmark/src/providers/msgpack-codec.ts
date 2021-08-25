import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('msgpack-codec');

  // comment below to enable it
  return skip('msgpack-codec', 'Much slower than others');

  if (!provider) {
    return skip('msgpack-codec');
  }

  return {
    name: 'msgpack-codec',
    encode: provider.encode,
    decode: provider.decode,
  };
};
