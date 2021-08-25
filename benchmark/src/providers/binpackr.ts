import {Definition, Entry, Fixture, skip} from '../types';

import provider from '../../../packages/binpackr';

export = async function prepare(fixture: Fixture, definition?: Definition): Promise<Entry[]> {
  if (!provider || !definition) {
    return [skip('binpackr')];
  }
  const codec = provider.build(definition.schema, true);
  const codecWithoutValidate = provider.build(definition.schema, false);

  return [
    {
      name: 'binpackr',
      encode: codec.encode,
      decode: codec.decode,
    },
    {
      name: 'binpackr(no validation)',
      encode: codecWithoutValidate.encode,
      decode: codecWithoutValidate.decode,
    },
  ];
};
