import {tryImport} from '../utils';
import {Definition, Entry, Fixture, skip} from '../types';

export = async function prepare(fixture: Fixture, definition?: Definition): Promise<Entry> {
  const provider = await tryImport('protobufjs');
  if (!provider || !definition) {
    return skip('protobufjs');
  }
  const pbRoot = provider.Root.fromJSON(definition.schema);
  const pbMessage = pbRoot.lookupType(definition.root);
  return {
    name: 'protobufjs',
    encode(json: any): Buffer {
      return pbMessage.encode(json).finish();
    },
    decode(data: Buffer): any {
      return pbMessage.decode(data);
    },
  };
};
