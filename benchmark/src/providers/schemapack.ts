import {Definition, Entry, Fixture, skip} from '../types';
import {tryImport} from '../utils';

export = async function prepare(fixture: Fixture, definition?: Definition): Promise<Entry[]> {
  const provider = await tryImport('schemapack');

  if (!provider || !definition) {
    return [skip('schemapack')];
  }
  const codec = provider.build(definition.schema, true);
  const codecWithoutValidate = provider.build(definition.schema, false);

  return [
    {
      name: 'schemapack',
      encode: codec.encode,
      decode: codec.decode,
    },
    {
      name: 'schemapack(no validation)',
      encode: codecWithoutValidate.encode,
      decode: codecWithoutValidate.decode,
    },
  ];
};
