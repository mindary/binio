import {Entry, skip} from '../types';

export = async function prepare(): Promise<Entry> {
  if (!JSON) {
    return skip('json');
  }

  return {
    name: 'json',
    encode(json: any): Buffer {
      return Buffer.from(JSON.stringify(json));
    },
    decode(data: Buffer): any {
      return JSON.parse(data.toString());
    },
  };
};
