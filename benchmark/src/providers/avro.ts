import {tryImport} from '../utils';
import {Entry, Fixture, skip} from '../types';

export = async function prepare(fixture: Fixture): Promise<Entry> {
  const provider = await tryImport('avsc');

  if (!provider) {
    return skip('avro');
  }

  const type = provider.Type.forValue(fixture.data);

  return {
    name: 'avro',
    encode: type.toBuffer.bind(type),
    decode: type.fromBuffer.bind(type),
  };
};
