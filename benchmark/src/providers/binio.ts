import {Definition, Entry, Fixture, skip} from '../types';

import provider from 'binio';

export = async function prepare(fixture: Fixture, definition?: Definition): Promise<Entry[]> {
  if (!provider || !definition) {
    return [skip('binio')];
  }
  const codec = provider.build(definition.schema, true);
  const codecWithoutValidate = provider.build(definition.schema, false);

  return [
    {
      name: 'binio',
      encode: codec.encode,
      decode: codec.decode,
    },
    {
      name: 'binio(no validation)',
      encode: codecWithoutValidate.encode,
      decode: codecWithoutValidate.decode,
    },
  ];
};
