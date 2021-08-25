import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('cbor');

  // comment below to enable it
  return skip('cbor', 'Much slower than others');

  if (!provider) {
    return skip('cbor');
  }

  return {
    name: 'cbor',
    encode: provider.encode,
    decode: provider.decode,
  };
};
