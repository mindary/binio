import {Buffer} from 'buffer';
import {expect} from '@loopback/testlab';
import {
  addTypeAlias,
  build,
  getDataType,
  getStringEncoding,
  getValidateByDefault,
  setStringEncoding,
  setValidateByDefault,
  StringEncoding,
} from '../../binpackr';
import {BTDDataType, BUILTIN_TYPES, CompiledDecode, CompiledEncode} from '../../types';

describe('Binpack Unit Test', function () {
  let currentValidateByDefault: any;
  let currentEncoding: any;

  beforeEach(() => {
    currentValidateByDefault = getValidateByDefault();
    currentEncoding = getStringEncoding();
  });

  afterEach(function () {
    setValidateByDefault(currentValidateByDefault);
    setStringEncoding(currentEncoding);
  });

  describe('setValidateByDefault', function () {
    it('should set validateByDefault', function () {
      const current = getValidateByDefault();
      setValidateByDefault(!current);
      expect(getValidateByDefault()).equal(!current);
    });
  });

  describe('setStringEncoding', function () {
    it('should change string encoding', function () {
      for (const encoding of StringEncoding) {
        setStringEncoding(encoding);
        expect(getStringEncoding()).equal(encoding);
      }
    });

    it('should throw error if not available', function () {
      expect(() => setStringEncoding('invalid_encoding' as any)).throw(/String encoding not available/);
    });
  });

  describe('addTypeAlias', function () {
    it('should add type alias', function () {
      addTypeAlias('布尔', 'boolean');
      const codec = build('布尔' as const);
      expect(codec.decode(codec.encode(true))).is.true();
      expect(codec.decode(codec.encode(false))).is.false();
    });

    it('should throw error to alias incorrect underlying type', function () {
      expect(() => addTypeAlias('new_type', 'unknown_type' as any)).throw(/Underlying type does not exist/);
    });
  });

  describe('getDataType', function () {
    it('should get data types', function () {
      addTypeAlias('布尔', 'boolean');
      for (const type of BUILTIN_TYPES) {
        expect(getDataType(type)).equal(type);
      }
      expect(getDataType('布尔')).equal('boolean');
    });

    it('should throw error to get invalid data type', function () {
      expect(() => getDataType('invalid_type')).throw(/Invalid data type for schema/);
    });
  });

  describe('encode/decode', function () {
    describe('object', function () {
      const schema = {
        boolean: 'boolean',
        int8: 'int8',
        uint8: 'uint8',
        int16: 'int16',
        uint16: 'uint16',
        int32: 'int32',
        uint32: 'uint32',
        float64: 'float64',
        string: 'string',
        varuint: 'varuint',
        varint: 'varint',
        buffer: 'buffer',
      } as const;

      const data: BTDDataType<typeof schema> = {
        boolean: true,
        int8: -123,
        uint8: 123,
        int16: -0x7000,
        uint16: 0xf000,
        int32: -0x70000000,
        uint32: 0xf0000000,
        float64: 987654.32101,
        string: 'string',
        varuint: 123456,
        varint: 654321,
        buffer: Buffer.from('Hello Binpackr'),
      };

      it('should have exported compiled encode and compiled decode function for inspection', function () {
        const codec = build(schema);

        const compiledEncode = codec[CompiledEncode];
        const compiledDecode = codec[CompiledDecode];

        expect(compiledEncode).is.Function();
        expect(compiledDecode).is.Function();

        expect(compiledEncode.toString()).match(/return wBuffer/);
        expect(compiledDecode.toString()).match(/return ref1/);
      });

      it('should encode and decode', function () {
        const codec = build(schema);
        expect(codec.decode(codec.encode(data))).deepEqual(data);
      });

      it('should encode and decode without validate', function () {
        const codec = build(schema, false);
        expect(codec.decode(codec.encode(data))).deepEqual(data);
      });
    });

    describe('float32', function () {
      it('should encode and decode float32', function () {
        const codec = build('float32');
        expect(codec.decode(codec.encode(1234.567))).within(1234.5669, 1234.5671);
      });
    });

    it('should decode with array', function () {
      const codec = build('string');
      expect(codec.decode([...codec.encode('Hello Binpackr')])).equal('Hello Binpackr');
      expect(codec.decode([...codec.encode('')])).equal('');
    });

    describe('type errors', function () {
      it('should throw type not match error', function () {
        const codec = build('int32' as const);
        expect(() => codec.encode('hello' as any)).throw(/does not match the type/);
      });

      it('should bounds error', function () {
        const codec = build('int8');
        expect(() => codec.encode(-1234)).throw(/is less than minimum allowed value/);
        expect(() => codec.encode(1234)).throw(/is greater than maximum allowed value/);
      });
    });

    describe('BufferReader', function () {
      it('should decode with buffer reader', function () {
        const message = 'Hello';
        const codec = build('string');
        const encoded = codec.encode(message);
        const reader = {
          data: Buffer.concat([Buffer.from([1, 2, 3]), encoded, Buffer.from([4, 5, 6])]),
          offset: 3,
        };
        const decoded = codec.decode(reader);
        expect(decoded).deepEqual(message);
        expect(reader.offset).equal(3 + encoded.length);
      });
    });

    describe('Uint8Array', function () {
      it('should decode with Uint8Array', function () {
        const obj = [1, 2, 3];
        const codec = build(['uint8'] as const);
        expect(codec.decode(new Uint8Array(codec.encode(obj)))).deepEqual(obj);
      });
    });

    it('encode with buffer writer', function () {
      const obj = [1, 2, 3];
      const codec = build(['uint8'] as const);
      const writer = {
        data: Buffer.allocUnsafe(1024),
        offset: 0,
      };
      codec.encode(obj, writer);
      expect(writer.offset).equal(obj.length + 1);
      const reader = {
        data: writer.data,
        offset: 0,
      };
      const decoded = codec.decode(reader);
      expect(reader.offset).equal(obj.length + 1);
      expect(decoded).eql(obj);
    });
  });
});
