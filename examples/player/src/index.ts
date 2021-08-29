import bio, {BTDDataType} from '../../../packages/binio';

// Define the schema
const schema = {
  health: 'varuint',
  jumping: 'boolean',
  position: ['int16'],
  attributes: {str: 'uint8', agi: 'uint8', int: 'uint8'},
} as const;

// An object to serialize
const player: BTDDataType<typeof schema> = {
  health: 4000,
  jumping: false,
  position: [-540, 343, 1201],
  attributes: {str: 87, agi: 42, int: 22},
};

// Build the codec
const codec = bio.build(schema);

// Encode
const buffer = codec.encode(player);
console.log(buffer);

// Decode
const decoded = codec.decode(buffer);
console.log(decoded);
