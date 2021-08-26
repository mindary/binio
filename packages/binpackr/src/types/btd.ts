import {DeepReadonly} from 'ts-essentials';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer E> ? E : never;

export const CONSTANT_NUMBER_TYPE = [
  'int8',
  'uint8',
  'int16',
  'uint16',
  'int32',
  'uint32',
  'float32',
  'float64',
] as const;
export const CONSTANT_TYPE = ['boolean', ...CONSTANT_NUMBER_TYPE] as const;

export const DYNAMIC_NUMBER_TYPE = ['varuint', 'varint'] as const;
export const DYNAMIC_TYPE = [...DYNAMIC_NUMBER_TYPE, 'string', 'buffer'] as const;

export const NUMBER_TYPE = [...CONSTANT_NUMBER_TYPE, ...DYNAMIC_NUMBER_TYPE] as const;

export const BUILTIN_TYPES = [...CONSTANT_TYPE, ...DYNAMIC_TYPE] as const;

export const DATA_TYPES = [...BUILTIN_TYPES] as const;

export type ConstantType = ElementType<typeof CONSTANT_TYPE>;
export type DynamicType = ElementType<typeof DYNAMIC_TYPE>;
export type NumberType = ElementType<typeof NUMBER_TYPE>;
export type BuiltinType = ElementType<typeof BUILTIN_TYPES>;
export type DataType = ElementType<typeof DATA_TYPES> | string;

export function isConstantType(t: string): t is ConstantType {
  return CONSTANT_TYPE.includes(t as any);
}

/* istanbul ignore next */
export function isDynamicType(t: string): t is DynamicType {
  return DYNAMIC_TYPE.includes(t as any);
}

/** type is true if T is identically E */
type TypeEquality<T, E> = [T] extends [E] ? ([E] extends [T] ? true : false) : false;

/** type is true if T or null is identically E or null*/
type NullTypeEquality<T, E> = TypeEquality<T | null, E | null>;

interface ObjectType {
  [p: string]: SomeBTDSchema;
}

type SomeBTDSchema = DataType | ObjectType | DeepReadonly<ObjectType> | Array<SomeBTDSchema>;

export type BTDSchema = SomeBTDSchema | Readonly<SomeBTDSchema>;

export type BTDSchemaType<T> = true extends NullTypeEquality<T, number>
  ? NumberType
  : true extends NullTypeEquality<T, boolean>
  ? 'boolean' | 'bool'
  : true extends NullTypeEquality<T, string>
  ? 'string'
  : true extends NullTypeEquality<T, Buffer>
  ? 'buffer'
  : T extends Record<string, unknown> | DeepReadonly<Record<string, unknown>>
  ? {-readonly [K in keyof T]-?: BTDSchemaType<T[K]>}
  : T extends [] | DeepReadonly<[]>
  ? []
  : T extends [...infer E] | Readonly<[...infer E]>
  ? {[I in keyof E]: BTDSchemaType<E[I]>}
  : never;

type BTDDataDef<S> = S extends NumberType
  ? number
  : S extends 'boolean' | 'bool'
  ? boolean
  : S extends 'string'
  ? string
  : S extends 'buffer'
  ? Buffer
  : S extends Record<string, unknown> | DeepReadonly<Record<string, unknown>>
  ? {-readonly [K in keyof S]-?: BTDDataDef<S[K]>}
  : S extends [] | DeepReadonly<[]>
  ? []
  : S extends [...infer E, infer L] | Readonly<[...infer E, infer L]>
  ? [...{[I in keyof E]: BTDDataDef<E[I]>}, ...BTDDataDef<L>[]]
  : never;

export type BTDDataType<S> = BTDDataDef<S>;

// export const schema = ['bool', ['int8', ['varint'], 'varuint'], 'string'] as const;
// export const data: BTDDataDef<typeof schema> = [
//   true,
//   [7, [-866, 4453, 5234234, 4543434, 4544666], 1, 100, 10000],
//   'hi',
// ];

// type Message = {a: [boolean, [string, ...number[]], ...number[]]};
//
// const schema: BTDSchemaType<Message> = {a: ['boolean', ['string', 'uint8'], 'uint16']};
//
// console.log(schema);
