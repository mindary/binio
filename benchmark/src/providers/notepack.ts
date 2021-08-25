import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('notepack');

  // comment below to enable it
  return skip('notepack', 'Much slower than others');

  if (!provider) {
    return skip('notepack');
  }

  return {
    name: 'notepack',
    encode: provider.encode,
    decode: provider.decode,
  };
};
