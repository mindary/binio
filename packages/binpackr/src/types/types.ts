import {Buffer} from 'buffer';

export type BufferLike = Buffer | Uint8Array | ReadonlyArray<number>;
export type ReadableBuffer = BufferLike;
export type WritableBuffer = Buffer;

export interface BufferHolder<T> {
  data: T;
  offset: number;
}

export type BufferReader = BufferHolder<ReadableBuffer>;
export type BufferWriter = BufferHolder<WritableBuffer>;

export const CompiledEncode = Symbol('encode');
export const CompiledDecode = Symbol('encode');

export interface Codec<T = any> {
  [CompiledEncode]: Function;
  [CompiledDecode]: Function;

  encode(source: T, target?: WritableBuffer | BufferWriter): Buffer;

  decode(source: ReadableBuffer | BufferReader): T;
}

export function isBufferLike(x: any): x is BufferLike {
  return (
    Buffer.isBuffer(x) ||
    Array.isArray(x) ||
    (x.buffer && typeof x.byteOffset === 'number' && typeof x.byteLength === 'number')
  );
}

export function isWritableBuffer(x: any): x is WritableBuffer {
  return Buffer.isBuffer(x);
}
