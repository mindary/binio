import {tryImport} from '../utils';
import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry[]> {
  const provider = await tryImport('msgpackr');
  if (!provider) {
    return [skip('msgpackr')];
  }

  const codec = new provider.Packr({useRecords: false});
  const codecWithStructures = new provider.Packr({structures: []});

  return [
    {
      name: 'msgpackr',
      encode: codec.pack.bind(codec),
      decode: codec.unpack.bind(codec),
    },
    {
      name: 'msgpackr(shared structures)',
      encode: codecWithStructures.pack.bind(codecWithStructures),
      decode: codecWithStructures.unpack.bind(codecWithStructures),
    },
  ];
};
