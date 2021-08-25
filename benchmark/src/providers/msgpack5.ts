import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  const provider = await tryImport('msgpack5');

  // comment below to enable it
  return skip('msgpack5', 'Much slower than others');

  if (!provider) {
    return skip('msgpack5');
  }

  const msgpack = provider();

  return {
    name: 'msgpack5',
    encode: msgpack.encode,
    decode: msgpack.decode,
  };
};
