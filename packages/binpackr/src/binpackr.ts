import {Buffer} from 'buffer';
import {
  BTDDataType,
  BTDSchema,
  BUILTIN_TYPES,
  BuiltinType,
  Codec,
  ConstantType,
  DataHolder,
  DataLike,
  DataType,
  isConstantType,
  isDataLike,
} from './types';

export const StringEncoding: Readonly<BufferEncoding[]> = [
  'ascii',
  'utf8',
  'utf-8',
  'utf16le',
  'ucs2',
  'ucs-2',
  'base64',
  'base64url',
  'latin1',
  'binary',
  'hex',
] as const;

let strEnc: BufferEncoding = 'utf8';
let validateByDefault = true;
const aliasTypes: Record<string, string> = {};

export function addTypeAlias(newTypeName: string, underlyingType: BuiltinType) {
  if (BUILTIN_TYPES.indexOf(underlyingType as any) < 0) {
    throw new TypeError('Underlying type does not exist. Typo?');
  } else {
    aliasTypes[newTypeName] = underlyingType;
  }
}

export function getDataType(val: string): BuiltinType {
  const everyType = BUILTIN_TYPES;
  let dataType = val.trim().toLowerCase() as any;
  if (dataType in aliasTypes) {
    dataType = aliasTypes[dataType];
  }
  if (everyType.indexOf(dataType) === -1) {
    throw new TypeError('Invalid data type for schema: ' + val + ' -> ' + dataType);
  }
  return dataType;
}

export function getValidateByDefault() {
  return validateByDefault;
}

export function setValidateByDefault(flag: boolean) {
  validateByDefault = flag;
}

export function getStringEncoding() {
  return strEnc;
}

export function setStringEncoding(encoding: BufferEncoding) {
  const requested = encoding.trim().toLowerCase();
  if (StringEncoding.indexOf(requested as any) > -1) {
    strEnc = requested as BufferEncoding;
  } else {
    throw new TypeError('String encoding not available');
  }
}

function writeVarUInt(value: any, wBuffer: Buffer) {
  while (value > 127) {
    wBuffer[bag.byteOffset++] = (value & 127) | 128;
    value >>= 7;
  }
  wBuffer[bag.byteOffset++] = value & 127;
}

function writeVarInt(value: number, wBuffer: Buffer) {
  writeVarUInt((value << 1) ^ (value >> 31), wBuffer);
}

function readVarUInt(buffer: Buffer) {
  let val = 0,
    i = 0,
    b: number;

  do {
    b = buffer[bag.byteOffset++];
    val |= (b & 127) << (7 * i);
    i++;
  } while (b & 128);

  return val;
}

function readVarInt(buffer: Buffer) {
  const val = readVarUInt(buffer);
  return (val >>> 1) ^ -(val & 1);
}

function writeString(val: string | undefined | null, wBuffer: Buffer) {
  const len = Buffer.byteLength(val || '', strEnc as any);
  writeVarUInt(len, wBuffer);
  bag.byteOffset += wBuffer.write(val || '', bag.byteOffset, len, strEnc as any);
}

function readString(buffer: Buffer) {
  const len = readVarUInt(buffer);
  const str = buffer.toString(strEnc as any, bag.byteOffset, bag.byteOffset + len);
  bag.byteOffset += len;
  return str;
}

function writeBuffer(val: Buffer, wBuffer: Buffer) {
  const len = val.length;
  writeVarUInt(len, wBuffer);
  val.copy(wBuffer, bag.byteOffset);
  bag.byteOffset += len;
}

function readBuffer(buffer: Buffer) {
  const len = readVarUInt(buffer);
  const buff = Buffer.allocUnsafe(len);
  buffer.copy(buff, 0, bag.byteOffset, bag.byteOffset + len);
  bag.byteOffset += len;
  return buff;
}

const readTypeDictStr: Record<BuiltinType, string> = {
  boolean: '!!buffer.readUInt8(bag.byteOffset, true); bag.byteOffset += 1;',
  int8: 'buffer.readInt8(bag.byteOffset, true); bag.byteOffset += 1;',
  uint8: 'buffer.readUInt8(bag.byteOffset, true); bag.byteOffset += 1;',
  int16: 'buffer.readInt16BE(bag.byteOffset, true); bag.byteOffset += 2;',
  uint16: 'buffer.readUInt16BE(bag.byteOffset, true); bag.byteOffset += 2;',
  int32: 'buffer.readInt32BE(bag.byteOffset, true); bag.byteOffset += 4;',
  uint32: 'buffer.readUInt32BE(bag.byteOffset, true); bag.byteOffset += 4;',
  float32: 'buffer.readFloatBE(bag.byteOffset, true); bag.byteOffset += 4;',
  float64: 'buffer.readDoubleBE(bag.byteOffset, true); bag.byteOffset += 8;',
  string: 'bag.readString(buffer);',
  varuint: 'bag.readVarUInt(buffer);',
  varint: 'bag.readVarInt(buffer);',
  buffer: 'bag.readBuffer(buffer);',
};

function getWriteTypeDictStr(dataType: BuiltinType, valStr: string) {
  switch (dataType) {
    case 'boolean':
      return 'bag.byteOffset = wBuffer.writeUInt8(' + valStr + ' ? 1 : 0, bag.byteOffset, true);';
    case 'int8':
      return 'bag.byteOffset = wBuffer.writeInt8(' + valStr + ', bag.byteOffset, true);';
    case 'uint8':
      return 'bag.byteOffset = wBuffer.writeUInt8(' + valStr + ', bag.byteOffset, true);';
    case 'int16':
      return 'bag.byteOffset = wBuffer.writeInt16BE(' + valStr + ', bag.byteOffset, true);';
    case 'uint16':
      return 'bag.byteOffset = wBuffer.writeUInt16BE(' + valStr + ', bag.byteOffset, true);';
    case 'int32':
      return 'bag.byteOffset = wBuffer.writeInt32BE(' + valStr + ', bag.byteOffset, true);';
    case 'uint32':
      return 'bag.byteOffset = wBuffer.writeUInt32BE(' + valStr + ', bag.byteOffset, true);';
    case 'float32':
      return 'bag.byteOffset = wBuffer.writeFloatBE(' + valStr + ', bag.byteOffset, true);';
    case 'float64':
      return 'bag.byteOffset = wBuffer.writeDoubleBE(' + valStr + ', bag.byteOffset, true);';
    case 'string':
      return 'bag.writeString(' + valStr + ', wBuffer);';
    case 'varuint':
      return 'bag.writeVarUInt(' + valStr + ', wBuffer);';
    case 'varint':
      return 'bag.writeVarInt(' + valStr + ', wBuffer);';
    case 'buffer':
      return 'bag.writeBuffer(' + valStr + ', wBuffer);';
    /* istanbul ignore next */
    default:
      return '';
  }
}

const constantByteCounts: Record<ConstantType, number> = {
  boolean: 1,
  int8: 1,
  uint8: 1,
  int16: 2,
  uint16: 2,
  int32: 4,
  uint32: 4,
  float32: 4,
  float64: 8,
};

const dynamicByteCounts = {
  string: (val: string) => {
    const len = Buffer.byteLength(val, strEnc);
    return getVarUIntByteLength(len) + len;
  },
  varuint: (val: number) => getVarUIntByteLength(val),
  varint: (val: number) => getVarIntByteLength(val),
  buffer: (val: Buffer) => {
    const len = val.length;
    return getVarUIntByteLength(len) + len;
  },
};

function getVarUIntByteLength(val: number) {
  if (val <= 0) {
    return 1;
  }
  return Math.floor(Math.log(val) / Math.log(128)) + 1;
}

function getVarIntByteLength(value: number) {
  return getVarUIntByteLength((value << 1) ^ (value >> 31));
}

function allocUnsafe(n: number) {
  return Buffer.allocUnsafe(n);
}

const bag = {
  allocUnsafe,
  getVarUIntByteLength,
  dynamicByteCounts,
  readVarUInt,
  readVarInt,
  writeVarUInt,
  writeVarInt,
  readString,
  writeString,
  readBuffer,
  writeBuffer,
  throwTypeError,
  byteOffset: 0,
};

function processArrayEnd(val: any[], id: number | string, commands: string, stackLen: number, arrLenStr?: string) {
  const repID = stackLen <= 1 ? id : id + 'xn';
  const outerBound = arrLenStr ?? 'ref' + repID + '.length';
  const jStr = 'j' + id;

  return (
    'for (let ' + jStr + '=' + (val.length - 1) + ';' + jStr + '<' + outerBound + ';' + jStr + '++) { ' + commands + '}'
  );
}

function getArrayLengthByteCount(id: number | string) {
  return 'byteC+=bag.getVarUIntByteLength(ref' + id + '.length);';
}

function encodeArrayLength(id: number | string) {
  return 'bag.writeVarUInt(ref' + id + '.length,wBuffer);';
}

function decodeArrayLength(arrLenStr: string) {
  return 'let ' + arrLenStr + '=bag.readVarUInt(buffer);';
}

function declareDecodeRef(id: number | string, parentID: number | string, prop: number | string, container: string) {
  return 'let ref' + id + '=' + container + '; ref' + parentID + '[' + prop + ']=ref' + id + ';';
}

function declareEncodeRef(id: number | string, parentID: number | string, prop: number | string) {
  return 'let ref' + id + '=ref' + parentID + '[' + prop + '];';
}

function declareRepeatRefs(
  repItem: boolean,
  id: number | string,
  parentID: number | string,
  prop: number | string,
  container: string,
  repEncArrStack: string[],
  repDecArrStack: string[],
  repByteCountStack: string[],
) {
  // const repID = getXN(repEncArrStack, id);
  const parentIDXN = getXN(repEncArrStack, parentID);
  const index = repItem ? 'j' + parentID : prop;

  repEncArrStack[repEncArrStack.length - 1] += declareEncodeRef(id + 'xn', parentIDXN, index);
  repDecArrStack[repDecArrStack.length - 1] += declareDecodeRef(id + 'xn', parentIDXN, index, container);
  repByteCountStack[repByteCountStack.length - 1] += declareEncodeRef(id + 'xn', parentIDXN, index);
}

function throwTypeError(valStr: string, typeStr: string, min: string, max: string, schemaType: string) {
  /* istanbul ignore else */
  if (typeof valStr !== typeStr) {
    throw new TypeError(valStr + ' does not match the type of ' + typeStr);
  } else if (min !== undefined && valStr < min) {
    throw new TypeError(valStr + ' is less than minimum allowed value of ' + min + ' for schema type ' + schemaType);
  } else if (max !== undefined && valStr > max) {
    throw new TypeError(valStr + ' is greater than maximum allowed value of ' + max + ' for schema type ' + schemaType);
  }
}

function getCheckBufferStr(valStr: string) {
  const throwMessage = 'bag.throwTypeError(' + valStr + ",'Buffer or Uint8Array');";
  return (
    'if (' +
    valStr +
    ' instanceof Uint8Array === false && ' +
    valStr +
    ' instanceof Buffer === false){' +
    throwMessage +
    '}'
  );
}

function getCheckDataTypeStr(valStr: string, typeStr: string) {
  const throwMessage = 'bag.throwTypeError(' + valStr + ",'" + typeStr + "');";
  return 'if (typeof(' + valStr + ") !== '" + typeStr + "'){" + throwMessage + '}';
}

function getBoundsCheckStr(valStr: string, min: number, max: number, schemaType: string) {
  const throwMessage = 'bag.throwTypeError(' + valStr + ",'number'," + min + ',' + max + ",'" + schemaType + "');";
  return (
    'if (typeof(' +
    valStr +
    ") !== 'number'||" +
    valStr +
    '<' +
    min +
    '||' +
    valStr +
    '>' +
    max +
    '){' +
    throwMessage +
    '}'
  );
}

function validateDataType(dataType: BuiltinType, valStr: string) {
  const maxFloat = 3.4028234663852886e38;

  switch (dataType) {
    case 'boolean':
      return getCheckDataTypeStr(valStr, 'boolean');
    case 'int8':
      return getBoundsCheckStr(valStr, -0x80, 0x7f, 'int8');
    case 'uint8':
      return getBoundsCheckStr(valStr, 0, 0xff, 'uint8');
    case 'int16':
      return getBoundsCheckStr(valStr, -0x8000, 0x7fff, 'int16');
    case 'uint16':
      return getBoundsCheckStr(valStr, 0, 0xffff, 'uint16');
    case 'int32':
      return getBoundsCheckStr(valStr, -0x80000000, 0x7fffffff, 'int32');
    case 'uint32':
      return getBoundsCheckStr(valStr, 0, 0xffffffff, 'uint32');
    case 'float32':
      return getBoundsCheckStr(valStr, -maxFloat, maxFloat, 'float32');
    case 'float64':
      return getBoundsCheckStr(valStr, -Number.MAX_VALUE, Number.MAX_VALUE, 'float64');
    case 'string':
      return getCheckDataTypeStr(valStr, 'string');
    case 'varuint':
      return getBoundsCheckStr(valStr, 0, 0x7fffffff, 'varuint');
    case 'varint':
      return getBoundsCheckStr(valStr, -0x40000000, 0x3fffffff, 'varint');
    case 'buffer':
      return getCheckBufferStr(valStr);
  }
}

function encodeValue(dataType: BuiltinType, id: number | string, prop: number | string, validate?: boolean) {
  const varName = 'ref' + id + prop;
  return (validate ? validateDataType(dataType, varName) : '') + getWriteTypeDictStr(dataType, varName);
}

function decodeValue(dataType: BuiltinType, id: number | string, prop: number | string) {
  return 'ref' + id + prop + '=' + readTypeDictStr[dataType];
}

function encodeByteCount(dataType: DataType, id: number | string, prop: number | string) {
  if (isConstantType(dataType)) {
    return 'byteC+=' + constantByteCounts[dataType] + ';';
  } else {
    return "byteC+=bag.dynamicByteCounts['" + dataType + "'](ref" + id + prop + ');';
  }
}

function getXN(aStack: string[], id: number | string) {
  return aStack.length <= 2 && aStack[aStack.length - 1].length <= 0 ? id : id + 'xn';
}

function getCompiledSchema(schema: BTDSchema, validate?: boolean) {
  let incID = 0;
  let strEncodeFunction = ''; //'bag.byteOffset=0;';
  let strDecodeFunction = 'let ref1={};'; // bag.byteOffset=0;';
  let strByteCount = '';
  let strEncodeRefDecs = 'let ref1=json;';

  const repEncArrStack = [''];
  const repDecArrStack = [''];
  const repByteCountStack = [''];
  let tmpRepEncArr = '';
  let tmpRepDecArr = '';
  let tmpRepByteCount = '';

  const wrappedSchema = {a: schema};

  function compileSchema(definition: any, inArray: boolean) {
    incID++;
    const keys = Object.keys(definition).sort(function (a, b) {
      /* istanbul ignore next */
      return a < b ? -1 : a > b ? 1 : 0;
    });

    const saveID = incID;

    for (let i = 0; i < keys.length; i++) {
      let key: string | number = keys[i];
      const val = (definition as any)[key];

      if (inArray) {
        key = +key;
      }

      const prop = typeof key === 'number' ? key : "'" + key + "'";
      const container = Array.isArray(val) ? '[]' : '{}';
      const isRepArrItem = inArray && i >= keys.length - 1;

      if (isRepArrItem) {
        repEncArrStack.push('');
        repDecArrStack.push('');
        repByteCountStack.push('');
      }

      if (Array.isArray(val)) {
        const newID = incID + 1;
        const repID = repEncArrStack.length <= 1 ? newID : newID + 'xn';
        const arrLenStr = 'arrLen' + incID;

        if (repEncArrStack.length === 1) {
          strEncodeRefDecs += declareEncodeRef(newID, saveID, prop);
          strDecodeFunction += declareDecodeRef(newID, saveID, prop, '[]');
        }

        const encArrayLength = encodeArrayLength(repID);
        const decArrayLength = decodeArrayLength(arrLenStr);
        const byteArrayLength = getArrayLengthByteCount(repID);

        declareRepeatRefs(
          isRepArrItem,
          newID,
          saveID,
          prop,
          container,
          repEncArrStack,
          repDecArrStack,
          repByteCountStack,
        );

        compileSchema(val, true);

        tmpRepEncArr =
          encArrayLength + processArrayEnd(val, newID, repEncArrStack.pop() + tmpRepEncArr, repEncArrStack.length);
        tmpRepDecArr =
          decArrayLength +
          processArrayEnd(val, newID, repDecArrStack.pop() + tmpRepDecArr, repEncArrStack.length, arrLenStr);
        tmpRepByteCount =
          byteArrayLength +
          processArrayEnd(val, newID, repByteCountStack.pop() + tmpRepByteCount, repEncArrStack.length);

        if (repEncArrStack.length === 1) {
          strEncodeFunction += tmpRepEncArr;
          tmpRepEncArr = '';
          strDecodeFunction += tmpRepDecArr;
          tmpRepDecArr = '';
          strByteCount += tmpRepByteCount;
          tmpRepByteCount = '';
        }
      } else if (typeof val === 'object') {
        const newID = incID + 1;

        if (repEncArrStack.length === 1) {
          strEncodeRefDecs += declareEncodeRef(newID, saveID, prop);
          strDecodeFunction += declareDecodeRef(newID, saveID, prop, '{}');
        }

        declareRepeatRefs(
          isRepArrItem,
          newID,
          saveID,
          prop,
          container,
          repEncArrStack,
          repDecArrStack,
          repByteCountStack,
        );

        compileSchema(val, false);
      } else {
        const index = inArray ? '' : '[' + prop + ']';
        const dataType = getDataType(val);
        (definition as any)[key] = dataType;

        let repID = getXN(repEncArrStack, saveID);
        if (inArray) {
          repID += isRepArrItem ? '[j' + saveID + ']' : '[' + i + ']';
        }

        repEncArrStack[repEncArrStack.length - 1] += encodeValue(dataType, repID, index, validate);
        repDecArrStack[repDecArrStack.length - 1] += decodeValue(dataType, repID, index);
        repByteCountStack[repByteCountStack.length - 1] += encodeByteCount(dataType, repID, index);

        if (repEncArrStack.length > 1) {
          continue;
        }

        const uniqID = inArray ? saveID + '[' + i + ']' : saveID;
        strEncodeFunction += encodeValue(dataType, uniqID, index, validate);
        strDecodeFunction += decodeValue(dataType, uniqID, index);
        strByteCount += encodeByteCount(dataType, uniqID, index);
      }
    }
  }

  compileSchema(wrappedSchema, false);

  strByteCount = 'let byteC=0;'.concat(strByteCount, 'let wBuffer=bag.allocUnsafe(byteC);');
  strEncodeFunction = strEncodeRefDecs.concat(strByteCount, strEncodeFunction, 'return wBuffer;');
  strDecodeFunction = strDecodeFunction.concat("return ref1['a'];");

  const compiledEncode = new Function('json', 'bag', strEncodeFunction);
  const compiledDecode = new Function('buffer', 'bag', strDecodeFunction);

  return [compiledEncode, compiledDecode];
}

addTypeAlias('bool', 'boolean');

export function build<T extends BTDSchema = BTDSchema>(schema: T, validate?: boolean): Codec<BTDDataType<T>> {
  const [compiledEncode, compiledDecode] = getCompiledSchema(schema, validate ?? validateByDefault);
  return {
    encode(json) {
      bag.byteOffset = 0;
      const itemWrapper = {a: json};
      return compiledEncode(itemWrapper, bag);
    },

    decode(data: DataLike | DataHolder) {
      const holder: DataHolder = isDataLike(data) ? {data, offset: 0} : data;
      bag.byteOffset = holder.offset;
      const buffer = Buffer.isBuffer(holder.data) ? holder.data : Buffer.from(holder.data);
      const answer = compiledDecode(buffer, bag);
      holder.offset = bag.byteOffset;
      return answer;
    },
  };
}
