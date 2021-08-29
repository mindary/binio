# binio

> The fastest JavaScript object serialization library. Efficiently encode your objects in to compact byte buffers and
> then decode them back in to objects on the receiver. Integrates very well with WebSockets.
>
> Binpack is initial forked from [schemapack](https://github.com/phretaddin/schemapack)

```ts
// On both the client and server:
import bio, {BTDDataType} from 'binio';

const schema = {
  health: "varuint",
  jumping: "boolean",
  position: [ "int16" ],
  attributes: { str: 'uint8', agi: 'uint8', int: 'uint8' }
} as const;

// On the client:
const player: BTDDataType<typeof schema> =  {
  health: 4000,
  jumping: false,
  position: [ -540, 343, 1201 ],
  attributes: { str: 87, agi: 42, int: 22 }
};

const codec = bio.build(schema);

const buffer = codec.encode(player);
socket.emit('player-message', buffer); // Use some JavaScript WebSocket library to get this socket variable.

// On the server:
socket.on('player-message', function(buffer) {
  const player = playerSchema.decode(buffer);
}
```

In this example, the size of payload is only **13 bytes**. Using `JSON.stringify` instead causes the payload to be **100
bytes**.

If you can't emit message strings and can only send array buffers by themselves, add something like `__message: "uint8"`
to the start of all your schemas/objects. On the receiver you can just read the first byte of the buffer to determine
what message it is.

## Motivation

I was working on an app that used WebSockets to talk between client and server. Usually when doing this the client and
server just send JSON back and forth. However, when receiving a message the receiver already knows what the format of
the message is going to be. Example:

```js
// Client:
const message = {sender: 'John', contents: 'hi'};
socket.emit('chat', message);

// Server
socket.on('chat', function (message) {
  // We know message is going to be an object with 'sender' and 'contents' keys
});
```

### The problems I had with sending JSON back and forth between client and server:

- It's a complete waste of bandwidth to send all those keys and delimiters when the object format is known.
- Even though `JSON.stringify` and `JSON.parse` are optimized native functions, they're slower than buffers.
- There's no implicit central message repository where I can look at the format of all my different packets.
- There's no validation so there's potential to have silent errors when accidentally sending the wrong message.

### Why I didn't just use an existing schema packing library:

- _Too complicated:_ I didn't want to have to learn a schema language and format a schema for every object.
- _Too slow:_ I benchmarked a couple of other popular libraries and they were often 10x slower than using the native
  `JSON.stringify` and `JSON.parse`. This library is faster than even those native methods.
- _Too large:_ I didn't want to use a behemoth library with tens of thousands of lines of code and many dependencies for
  something so simple. This library is 400 lines of code with no dependencies.
- _Too much overhead:_ Some other libraries that allow you to specify a schema still waste a lot of bytes on
  padding/keys/etc. This library is designed to not waste a single byte on anything that isn't your data.

### Why not just use gzip compression?

- _Bandwidth usage:_ If you gzip the `player` example at the top, the payload will actually _increase_ in size. Thus,
  many engines don't gzip small packets. Compression works best with large payloads with repetition.
- _Memory usage:_ It is common for compression to use an additional 300 kilobytes **per connection**.
- _CPU usage:_ Per-message-deflate can increase encoding times by 5-10x with small payloads (~2x with large).
- _You still can:_ Using gzip and Binpack is not mutually exclusive. You can still use gzip on the array buffers.

## Benchmarks

### Encode
| Library                     |   Speed (ops/s) | % Slower |
| :-------------------------- | --------------: | -------: |
| schemapack(no validation)   | 7,982,562 ops/s |        - |
| binio(no validation)        | 7,735,986 ops/s |    3.09% |
| binio                       | 7,555,246 ops/s |    5.35% |
| schemapack                  | 7,428,666 ops/s |    6.94% |
| avro                        | 5,166,397 ops/s |   35.28% |
| msgpackr(shared structures) | 2,056,104 ops/s |   74.24% |
| msgpackr                    | 1,782,097 ops/s |   77.68% |
| protobufjs                  | 1,672,791 ops/s |   79.04% |
| json                        |   795,997 ops/s |   90.03% |

### Decode
| Library                     |    Speed (ops/s) | % Slower |
| :-------------------------- | ---------------: | -------: |
| binio                       | 19,010,955 ops/s |        - |
| schemapack                  | 15,574,976 ops/s |   18.07% |
| avro                        | 15,416,037 ops/s |   18.91% |
| msgpackr(shared structures) |  6,138,161 ops/s |   67.71% |
| protobufjs                  |  5,720,748 ops/s |   69.91% |
| msgpackr                    |  2,366,068 ops/s |   87.55% |
| binary-parser               |  1,159,752 ops/s |   93.90% |
| json                        |    888,271 ops/s |   95.33% |

### Encode Size
| Library                     | Size (B) | % of JSON |
| :-------------------------- | -------: | --------: |
| binio                       |     13 B |       13% |
| binio(no validation)        |     13 B |       13% |
| schemapack                  |     13 B |       13% |
| schemapack(no validation)   |     13 B |       13% |
| avro                        |     15 B |       15% |
| binary-parser               |     15 B |       15% |
| msgpackr(shared structures) |     20 B |       20% |
| protobufjs                  |     29 B |       29% |
| msgpackr                    |     71 B |       71% |
| json                        |    100 B |      100% |


All benchmarks were performed on node/v16.7.0; Darwin; Intel(R) Core(TM) i9-8950HK CPU @ 2.90GHz

In addition, Binpack really shines when used with large objects with a lot of nesting and long arrays compared to the
competition. I encourage you to run the benchmarks with your own objects to see what works best for you.

## Installation

```js
const bio = require('binio');
```

On the client, use esbuild/webpack/browserify to automatically include the prerequisite `buffer` shim if you're not
using it already.

For example, if you had a file `index.js` with the following:

```js
const bio = require('binio');
// More code here using binio
```

You can add the `Buffer` shim by typing `browserify index.js > bundle.js` and then including that file in your HTML.

```html
<script type="text/javascript" src="bundle.js"></script>
```

Alternatively, just grab the built minified file from the build folder in the Github repository. Then add the following
to your HTML page:

```html
<script type="text/javascript" src="binio.min.js"></script>
```

This will attach it to the window object. In your JavaScript files, the variable will available as `binio`. This built
file only needs to be used on the client, as the `node` server already includes the prerequisite `Buffer`. The server
should use the unbundled version.

## API

### Build your schema:

```js
const personSchema = bio.build({
  name: 'string',
  age: 'uint8',
  weight: 'float32',
}); // This parses, sorts, validates, flattens, and then saves the resulting schema.
```

### Encode your objects:

```js
const john = {
  name: 'John Smith',
  age: 32,
  weight: 188.5,
};
const buffer = personSchema.encode(john);
console.log(buffer); // <Buffer 20 0a 4a 6f 68 6e 20 53 6d 69 74 68 43 3c 80 00>
```

### Decode your buffers back to object:

```js
const object = personSchema.decode(buffer);
console.log(object.name); // John Smith
console.log(object.age); // 32
console.log(object.weight); // 188.5
```

### Important array information:

The last item in arrays is both optional and able to be repeated. For example, with this schema:

```js
const schema = bio.build({
  numbers: ['string', 'uint8'],
});
```

All the following objects are valid for it:

```js
const obj1 = {numbers: ['binio']};
const obj2 = {numbers: ['binio', 10]};
const obj3 = {numbers: ['lubinpackcky', 14, 7]};
const obj4 = {numbers: ['binio', 0, 5, 7]};
```

The last item can also be an array or object, with any amount of nesting. Here's an example schema:

```js
const schema = bio.build([{name: 'string', numbers: ['varint'], age: 'uint8'}]);
```

And here's an object that conforms to it:

```js
const obj = [
  {name: 'joe', numbers: [-3, 2, 5], age: 42},
  {name: 'john smith iv', numbers: [], age: 27},
  {name: 'bobby', numbers: [-22, 1], age: 6},
];
```

### Set the encoding used for strings:

`'utf8'` is the default. If you only need to support English, changing the string encoding to `'ascii'` can increase
speed. Choose between `'ascii'`, `'utf8'`, `'utf16le'`, `'ucs2'`, `'base64'`, `'binary'`, and `'hex'`.

```js
bio.setStringEncoding('ascii');
```

### Add type aliases:

```js
bio.addTypeAlias('int', 'varuint');
const builtSchema = bio.build(['string', 'int']);
const buffer = builtSchema.encode(['dave', 1, 2, 3]);
const object = builtSchema.decode(buffer);
console.log(object); // [ 'dave', 1, 2, 3 ]
```

### Validation

By default, validation is enabled. This means that the encode function will include checks to ensure passed objects
match the schema.

The build function takes an optional parameter for validation. If set to false, the aforementioned checks will be
excluded. Example:

```js
const builtSchema = bio.build({sample: 'string'}, false); // Validation checks won't be added to the encode function
```

To avoid having to pass this flag to each call of build, you can instead call `setValidateByDefault` to set the default
validation strategy. Example:

```js
bio.setValidateByDefault(false);
```

Setting the parameter to false will disable validation by default, while true will enable validation by default.

### Make single item schemas:

```js
const builtSchema = bio.build('varint');
const buffer = builtSchema.encode(-350);
const item = builtSchema.decode(buffer);
console.log(item); // -350
```

### Here is a table of the available data types for use in your schemas:

| Type Name | Aliases | Bytes                                                                                                                                                         | Range of Values                 |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| bool      | boolean | 1                                                                                                                                                             | True or false                   |
| int8      |         | 1                                                                                                                                                             | -128 to 127                     |
| uint8     |         | 1                                                                                                                                                             | 0 to 255                        |
| int16     |         | 2                                                                                                                                                             | -32,768 to 32,767               |
| uint16    |         | 2                                                                                                                                                             | 0 to 65,535                     |
| int32     |         | 4                                                                                                                                                             | -2,147,483,648 to 2,147,483,647 |
| uint32    |         | 4                                                                                                                                                             | 0 to 4,294,967,295              |
| float32   |         | 4                                                                                                                                                             | 3.4E +/- 38 (7 digits)          |
| float64   |         | 8                                                                                                                                                             | 1.7E +/- 308 (15 digits)        |
| string    |         | varuint length prefix followed by bytes of each character                                                                                                     | Any string                      |
| varuint   |         | 1 byte when 0 to 127<br /> 2 bytes when 128 to 16,383<br /> 3 bytes when 16,384 to 2,097,151<br /> 4 bytes when 2,097,152 to 268,435,455<br /> etc.           | 0 to 2,147,483,647              |
| varint    |         | 1 byte when -64 to 63<br /> 2 bytes when -8,192 to 8,191<br /> 3 bytes when -1,048,576 to 1,048,575<br /> 4 bytes when -134,217,728 to 134,217,727<br /> etc. | -1,073,741,824 to 1,073,741,823 |
| buffer    |         | varuint length prefix followed by bytes of buffer                                                                                                             | Any buffer                      |

## Tests

Just clone the repository, run `npm install` in the directory to get the testing framework (it also grabs other
libraries for the benchmarks)

Then run `npm test`.

## Compatibility

This library uses `Buffer` when in the `node.js` environment (always included) and the
[buffer shim](https://github.com/feross/buffer#features) when in the browser (included with browserify/webpack).

## License

MIT
