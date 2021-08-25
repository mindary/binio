import {Parser} from 'binary-parser';
import data from './player';
import {BufferWriter} from '@libit/bufio';

export const schema = new Parser()
  .int32('health')
  .uint8('jumping', {formatter: item => !!item})
  .uint8('positionLength')
  .array('position', {
    type: 'int16be',
    length: 'positionLength',
  })
  .nest('attributes', {
    type: new Parser().uint8('str').uint8('agi').uint8('int'),
  });

// export const encoded = build(<BTDSchema>{
//   health: 'int32',
//   jumping: 'boolean',
//   position: ['int16'],
//   attributes: {str: 'uint8', agi: 'uint8', int: 'uint8'},
// }).encode(data);

// prepare encoded buffer
const writer = new BufferWriter()
  .writeI32BE(data.health)
  .writeU8(data.jumping ? 1 : 0)
  .writeU8(data.position.length);
data.position.forEach(p => writer.writeI16BE(p));
writer.writeU8(data.attributes.str).writeU8(data.attributes.agi).writeU8(data.attributes.int);
export const encoded = writer.render();
