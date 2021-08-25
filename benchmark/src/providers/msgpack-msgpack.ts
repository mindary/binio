import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('@msgpack/msgpack');

  // comment below to enable it
  return skip('@msgpack/msgpack', 'Much slower than others');

  if (!provider) {
    return skip('@msgpack/msgpack');
  }

  return {
    name: '@msgpack/msgpack',
    encode: provider.encode,
    decode: provider.decode,
  };
};
