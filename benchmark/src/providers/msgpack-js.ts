import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('msgpack-js');

  // comment below to enable it
  return skip('msgpack-js', 'Much slower than others');

  if (!provider) {
    return skip('msgpack-js');
  }

  return {
    name: 'msgpack-js',
    encode: provider.encode,
    decode: provider.decode,
  };
};
