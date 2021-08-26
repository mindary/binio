import {Buffer} from 'buffer';

export type DataLike = Buffer | Uint8Array | ReadonlyArray<number>;
export interface DataHolder {
  data: DataLike;
  offset: number;
}

export interface Codec<T = any> {
  encode(json: T): Buffer;
  decode(data: DataLike | DataHolder): T;
}

export function isDataLike(x: any): x is DataLike {
  return (
    Buffer.isBuffer(x) ||
    Array.isArray(x) ||
    (x.buffer && typeof x.byteOffset === 'number' && typeof x.byteLength === 'number')
  );
}
