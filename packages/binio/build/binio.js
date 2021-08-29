(() => {
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/tslib/tslib.js
  var require_tslib = __commonJS({
    "node_modules/tslib/tslib.js"(exports, module) {
      var __extends;
      var __assign;
      var __rest;
      var __decorate;
      var __param;
      var __metadata;
      var __awaiter;
      var __generator;
      var __exportStar;
      var __values;
      var __read;
      var __spread;
      var __spreadArrays;
      var __spreadArray;
      var __await;
      var __asyncGenerator;
      var __asyncDelegator;
      var __asyncValues;
      var __makeTemplateObject;
      var __importStar;
      var __importDefault;
      var __classPrivateFieldGet;
      var __classPrivateFieldSet;
      var __createBinding;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module === "object" && typeof module.exports === "object") {
          factory(createExporter(root, createExporter(module.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p))
              d[p] = b[p];
        };
        __extends = function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __exportStar = function(m, o) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
        };
        __createBinding = Object.create ? function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          Object.defineProperty(o, k2, { enumerable: true, get: function() {
            return m[k];
          } });
        } : function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __values = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
          return ar;
        };
        __spreadArrays = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __spreadArray = function(to, from, pack) {
          if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                if (!ar)
                  ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
              }
            }
          return to.concat(ar || Array.prototype.slice.call(from));
        };
        __await = function(v) {
          return this instanceof __await ? (this.v = v, this) : new __await(v);
        };
        __asyncGenerator = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        var __setModuleDefault = Object.create ? function(o, v) {
          Object.defineProperty(o, "default", { enumerable: true, value: v });
        } : function(o, v) {
          o["default"] = v;
        };
        __importStar = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          }
          __setModuleDefault(result, mod);
          return result;
        };
        __importDefault = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet = function(receiver, state, kind, f) {
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
        };
        __classPrivateFieldSet = function(receiver, state, value, kind, f) {
          if (kind === "m")
            throw new TypeError("Private method is not writable");
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
        };
        exporter("__extends", __extends);
        exporter("__assign", __assign);
        exporter("__rest", __rest);
        exporter("__decorate", __decorate);
        exporter("__param", __param);
        exporter("__metadata", __metadata);
        exporter("__awaiter", __awaiter);
        exporter("__generator", __generator);
        exporter("__exportStar", __exportStar);
        exporter("__createBinding", __createBinding);
        exporter("__values", __values);
        exporter("__read", __read);
        exporter("__spread", __spread);
        exporter("__spreadArrays", __spreadArrays);
        exporter("__spreadArray", __spreadArray);
        exporter("__await", __await);
        exporter("__asyncGenerator", __asyncGenerator);
        exporter("__asyncDelegator", __asyncDelegator);
        exporter("__asyncValues", __asyncValues);
        exporter("__makeTemplateObject", __makeTemplateObject);
        exporter("__importStar", __importStar);
        exporter("__importDefault", __importDefault);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet);
      });
    }
  });

  // dist/types/types.js
  var require_types = __commonJS({
    "dist/types/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isWritableBuffer = exports.isBufferLike = exports.CompiledDecode = exports.CompiledEncode = void 0;
      var buffer_1 = __require("buffer");
      exports.CompiledEncode = Symbol("encode");
      exports.CompiledDecode = Symbol("encode");
      function isBufferLike(x) {
        return buffer_1.Buffer.isBuffer(x) || Array.isArray(x) || x.buffer && typeof x.byteOffset === "number" && typeof x.byteLength === "number";
      }
      exports.isBufferLike = isBufferLike;
      function isWritableBuffer(x) {
        return buffer_1.Buffer.isBuffer(x);
      }
      exports.isWritableBuffer = isWritableBuffer;
    }
  });

  // dist/types/btd.js
  var require_btd = __commonJS({
    "dist/types/btd.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isDynamicType = exports.isConstantType = exports.DATA_TYPES = exports.BUILTIN_TYPES = exports.NUMBER_TYPE = exports.DYNAMIC_TYPE = exports.DYNAMIC_NUMBER_TYPE = exports.CONSTANT_TYPE = exports.CONSTANT_NUMBER_TYPE = void 0;
      exports.CONSTANT_NUMBER_TYPE = [
        "int8",
        "uint8",
        "int16",
        "uint16",
        "int32",
        "uint32",
        "float32",
        "float64"
      ];
      exports.CONSTANT_TYPE = ["boolean", ...exports.CONSTANT_NUMBER_TYPE];
      exports.DYNAMIC_NUMBER_TYPE = ["varuint", "varint"];
      exports.DYNAMIC_TYPE = [...exports.DYNAMIC_NUMBER_TYPE, "string", "buffer"];
      exports.NUMBER_TYPE = [...exports.CONSTANT_NUMBER_TYPE, ...exports.DYNAMIC_NUMBER_TYPE];
      exports.BUILTIN_TYPES = [...exports.CONSTANT_TYPE, ...exports.DYNAMIC_TYPE];
      exports.DATA_TYPES = [...exports.BUILTIN_TYPES];
      function isConstantType(t) {
        return exports.CONSTANT_TYPE.includes(t);
      }
      exports.isConstantType = isConstantType;
      function isDynamicType(t) {
        return exports.DYNAMIC_TYPE.includes(t);
      }
      exports.isDynamicType = isDynamicType;
    }
  });

  // dist/types/index.js
  var require_types2 = __commonJS({
    "dist/types/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = require_tslib();
      tslib_1.__exportStar(require_types(), exports);
      tslib_1.__exportStar(require_btd(), exports);
    }
  });

  // dist/codec.js
  var require_codec = __commonJS({
    "dist/codec.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.build = exports.setStringEncoding = exports.getStringEncoding = exports.setValidateByDefault = exports.getValidateByDefault = exports.getDataType = exports.addTypeAlias = exports.StringEncoding = void 0;
      var buffer_1 = __require("buffer");
      var types_1 = require_types2();
      exports.StringEncoding = [
        "ascii",
        "utf8",
        "utf-8",
        "utf16le",
        "ucs2",
        "ucs-2",
        "base64",
        "base64url",
        "latin1",
        "binary",
        "hex"
      ];
      var strEnc = "utf8";
      var validateByDefault = true;
      var aliasTypes = {};
      function addTypeAlias(newTypeName, underlyingType) {
        if (types_1.BUILTIN_TYPES.indexOf(underlyingType) < 0) {
          throw new TypeError("Underlying type does not exist. Typo?");
        } else {
          aliasTypes[newTypeName] = underlyingType;
        }
      }
      exports.addTypeAlias = addTypeAlias;
      function getDataType(val) {
        const everyType = types_1.BUILTIN_TYPES;
        let dataType = val.trim().toLowerCase();
        if (dataType in aliasTypes) {
          dataType = aliasTypes[dataType];
        }
        if (everyType.indexOf(dataType) === -1) {
          throw new TypeError("Invalid data type for schema: " + val + " -> " + dataType);
        }
        return dataType;
      }
      exports.getDataType = getDataType;
      function getValidateByDefault() {
        return validateByDefault;
      }
      exports.getValidateByDefault = getValidateByDefault;
      function setValidateByDefault(flag) {
        validateByDefault = flag;
      }
      exports.setValidateByDefault = setValidateByDefault;
      function getStringEncoding() {
        return strEnc;
      }
      exports.getStringEncoding = getStringEncoding;
      function setStringEncoding(encoding) {
        const requested = encoding.trim().toLowerCase();
        if (exports.StringEncoding.indexOf(requested) > -1) {
          strEnc = requested;
        } else {
          throw new TypeError("String encoding not available");
        }
      }
      exports.setStringEncoding = setStringEncoding;
      function writeVarUInt(value, wBuffer) {
        while (value > 127) {
          wBuffer[bag.byteOffset++] = value & 127 | 128;
          value >>= 7;
        }
        wBuffer[bag.byteOffset++] = value & 127;
      }
      function writeVarInt(value, wBuffer) {
        writeVarUInt(value << 1 ^ value >> 31, wBuffer);
      }
      function readVarUInt(buffer) {
        let val = 0;
        let i = 0;
        let b;
        do {
          b = buffer[bag.byteOffset++];
          val |= (b & 127) << 7 * i;
          i++;
        } while (b & 128);
        return val;
      }
      function readVarInt(buffer) {
        const val = readVarUInt(buffer);
        return val >>> 1 ^ -(val & 1);
      }
      function writeString(val, wBuffer) {
        const len = buffer_1.Buffer.byteLength(val || "", strEnc);
        writeVarUInt(len, wBuffer);
        bag.byteOffset += wBuffer.write(val || "", bag.byteOffset, len, strEnc);
      }
      function readString(buffer) {
        const len = readVarUInt(buffer);
        const str = buffer.toString(strEnc, bag.byteOffset, bag.byteOffset + len);
        bag.byteOffset += len;
        return str;
      }
      function writeBuffer(val, wBuffer) {
        const len = val.length;
        writeVarUInt(len, wBuffer);
        val.copy(wBuffer, bag.byteOffset);
        bag.byteOffset += len;
      }
      function readBuffer(buffer) {
        const len = readVarUInt(buffer);
        const buff = buffer_1.Buffer.allocUnsafe(len);
        buffer.copy(buff, 0, bag.byteOffset, bag.byteOffset + len);
        bag.byteOffset += len;
        return buff;
      }
      var readTypeDictStr = {
        boolean: "!!buffer.readUInt8(bag.byteOffset, true); bag.byteOffset += 1;",
        int8: "buffer.readInt8(bag.byteOffset, true); bag.byteOffset += 1;",
        uint8: "buffer.readUInt8(bag.byteOffset, true); bag.byteOffset += 1;",
        int16: "buffer.readInt16BE(bag.byteOffset, true); bag.byteOffset += 2;",
        uint16: "buffer.readUInt16BE(bag.byteOffset, true); bag.byteOffset += 2;",
        int32: "buffer.readInt32BE(bag.byteOffset, true); bag.byteOffset += 4;",
        uint32: "buffer.readUInt32BE(bag.byteOffset, true); bag.byteOffset += 4;",
        float32: "buffer.readFloatBE(bag.byteOffset, true); bag.byteOffset += 4;",
        float64: "buffer.readDoubleBE(bag.byteOffset, true); bag.byteOffset += 8;",
        string: "bag.readString(buffer);",
        varuint: "bag.readVarUInt(buffer);",
        varint: "bag.readVarInt(buffer);",
        buffer: "bag.readBuffer(buffer);"
      };
      function getWriteTypeDictStr(dataType, valStr) {
        switch (dataType) {
          case "boolean":
            return "bag.byteOffset = wBuffer.writeUInt8(" + valStr + " ? 1 : 0, bag.byteOffset, true);";
          case "int8":
            return "bag.byteOffset = wBuffer.writeInt8(" + valStr + ", bag.byteOffset, true);";
          case "uint8":
            return "bag.byteOffset = wBuffer.writeUInt8(" + valStr + ", bag.byteOffset, true);";
          case "int16":
            return "bag.byteOffset = wBuffer.writeInt16BE(" + valStr + ", bag.byteOffset, true);";
          case "uint16":
            return "bag.byteOffset = wBuffer.writeUInt16BE(" + valStr + ", bag.byteOffset, true);";
          case "int32":
            return "bag.byteOffset = wBuffer.writeInt32BE(" + valStr + ", bag.byteOffset, true);";
          case "uint32":
            return "bag.byteOffset = wBuffer.writeUInt32BE(" + valStr + ", bag.byteOffset, true);";
          case "float32":
            return "bag.byteOffset = wBuffer.writeFloatBE(" + valStr + ", bag.byteOffset, true);";
          case "float64":
            return "bag.byteOffset = wBuffer.writeDoubleBE(" + valStr + ", bag.byteOffset, true);";
          case "string":
            return "bag.writeString(" + valStr + ", wBuffer);";
          case "varuint":
            return "bag.writeVarUInt(" + valStr + ", wBuffer);";
          case "varint":
            return "bag.writeVarInt(" + valStr + ", wBuffer);";
          case "buffer":
            return "bag.writeBuffer(" + valStr + ", wBuffer);";
          default:
            return "";
        }
      }
      var constantByteCounts = {
        boolean: 1,
        int8: 1,
        uint8: 1,
        int16: 2,
        uint16: 2,
        int32: 4,
        uint32: 4,
        float32: 4,
        float64: 8
      };
      var dynamicByteCounts = {
        string: (val) => {
          const len = buffer_1.Buffer.byteLength(val, strEnc);
          return getVarUIntByteLength(len) + len;
        },
        varuint: (val) => getVarUIntByteLength(val),
        varint: (val) => getVarIntByteLength(val),
        buffer: (val) => {
          const len = val.length;
          return getVarUIntByteLength(len) + len;
        }
      };
      function getVarUIntByteLength(val) {
        if (val <= 0) {
          return 1;
        }
        return Math.floor(Math.log(val) / Math.log(128)) + 1;
      }
      function getVarIntByteLength(value) {
        return getVarUIntByteLength(value << 1 ^ value >> 31);
      }
      function allocUnsafe(n) {
        return buffer_1.Buffer.allocUnsafe(n);
      }
      var bag = {
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
        byteOffset: 0
      };
      function processArrayEnd(val, id, commands, stackLen, arrLenStr) {
        const repID = stackLen <= 1 ? id : id + "xn";
        const outerBound = arrLenStr !== null && arrLenStr !== void 0 ? arrLenStr : "ref" + repID + ".length";
        const jStr = "j" + id;
        return "for (let " + jStr + "=" + (val.length - 1) + ";" + jStr + "<" + outerBound + ";" + jStr + "++) { " + commands + "}";
      }
      function getArrayLengthByteCount(id) {
        return "byteC+=bag.getVarUIntByteLength(ref" + id + ".length);";
      }
      function encodeArrayLength(id) {
        return "bag.writeVarUInt(ref" + id + ".length,wBuffer);";
      }
      function decodeArrayLength(arrLenStr) {
        return "let " + arrLenStr + "=bag.readVarUInt(buffer);";
      }
      function declareDecodeRef(id, parentID, prop, container) {
        return "let ref" + id + "=" + container + "; ref" + parentID + "[" + prop + "]=ref" + id + ";";
      }
      function declareEncodeRef(id, parentID, prop) {
        return "let ref" + id + "=ref" + parentID + "[" + prop + "];";
      }
      function declareRepeatRefs(repItem, id, parentID, prop, container, repEncArrStack, repDecArrStack, repByteCountStack) {
        const parentIDXN = getXN(repEncArrStack, parentID);
        const index = repItem ? "j" + parentID : prop;
        repEncArrStack[repEncArrStack.length - 1] += declareEncodeRef(id + "xn", parentIDXN, index);
        repDecArrStack[repDecArrStack.length - 1] += declareDecodeRef(id + "xn", parentIDXN, index, container);
        repByteCountStack[repByteCountStack.length - 1] += declareEncodeRef(id + "xn", parentIDXN, index);
      }
      function throwTypeError(valStr, typeStr, min, max, schemaType) {
        if (typeof valStr !== typeStr) {
          throw new TypeError(valStr + " does not match the type of " + typeStr);
        } else if (min !== void 0 && valStr < min) {
          throw new TypeError(valStr + " is less than minimum allowed value of " + min + " for schema type " + schemaType);
        } else if (max !== void 0 && valStr > max) {
          throw new TypeError(valStr + " is greater than maximum allowed value of " + max + " for schema type " + schemaType);
        }
      }
      function getCheckBufferStr(valStr) {
        const throwMessage = "bag.throwTypeError(" + valStr + ",'Buffer or Uint8Array');";
        return "if (" + valStr + " instanceof Uint8Array === false && " + valStr + " instanceof Buffer === false){" + throwMessage + "}";
      }
      function getCheckDataTypeStr(valStr, typeStr) {
        const throwMessage = "bag.throwTypeError(" + valStr + ",'" + typeStr + "');";
        return "if (typeof(" + valStr + ") !== '" + typeStr + "'){" + throwMessage + "}";
      }
      function getBoundsCheckStr(valStr, min, max, schemaType) {
        const throwMessage = "bag.throwTypeError(" + valStr + ",'number'," + min + "," + max + ",'" + schemaType + "');";
        return "if (typeof(" + valStr + ") !== 'number'||" + valStr + "<" + min + "||" + valStr + ">" + max + "){" + throwMessage + "}";
      }
      function validateDataType(dataType, valStr) {
        const maxFloat = 34028234663852886e22;
        switch (dataType) {
          case "boolean":
            return getCheckDataTypeStr(valStr, "boolean");
          case "int8":
            return getBoundsCheckStr(valStr, -128, 127, "int8");
          case "uint8":
            return getBoundsCheckStr(valStr, 0, 255, "uint8");
          case "int16":
            return getBoundsCheckStr(valStr, -32768, 32767, "int16");
          case "uint16":
            return getBoundsCheckStr(valStr, 0, 65535, "uint16");
          case "int32":
            return getBoundsCheckStr(valStr, -2147483648, 2147483647, "int32");
          case "uint32":
            return getBoundsCheckStr(valStr, 0, 4294967295, "uint32");
          case "float32":
            return getBoundsCheckStr(valStr, -maxFloat, maxFloat, "float32");
          case "float64":
            return getBoundsCheckStr(valStr, -Number.MAX_VALUE, Number.MAX_VALUE, "float64");
          case "string":
            return getCheckDataTypeStr(valStr, "string");
          case "varuint":
            return getBoundsCheckStr(valStr, 0, 2147483647, "varuint");
          case "varint":
            return getBoundsCheckStr(valStr, -1073741824, 1073741823, "varint");
          case "buffer":
            return getCheckBufferStr(valStr);
        }
      }
      function encodeValue(dataType, id, prop, validate) {
        const varName = "ref" + id + prop;
        return (validate ? validateDataType(dataType, varName) : "") + getWriteTypeDictStr(dataType, varName);
      }
      function decodeValue(dataType, id, prop) {
        return "ref" + id + prop + "=" + readTypeDictStr[dataType];
      }
      function encodeByteCount(dataType, id, prop) {
        if (types_1.isConstantType(dataType)) {
          return "byteC+=" + constantByteCounts[dataType] + ";";
        } else {
          return "byteC+=bag.dynamicByteCounts['" + dataType + "'](ref" + id + prop + ");";
        }
      }
      function getXN(aStack, id) {
        return aStack.length <= 2 && aStack[aStack.length - 1].length <= 0 ? id : id + "xn";
      }
      function getCompiledSchema(schema, validate) {
        let incID = 0;
        let strEncodeFunction = "";
        let strDecodeFunction = "let ref1={};";
        let strByteCount = "";
        let strEncodeRefDecs = "let ref1=json;";
        const repEncArrStack = [""];
        const repDecArrStack = [""];
        const repByteCountStack = [""];
        let tmpRepEncArr = "";
        let tmpRepDecArr = "";
        let tmpRepByteCount = "";
        const wrappedSchema = { a: schema };
        function compileSchema(definition, inArray) {
          incID++;
          const keys = Object.keys(definition);
          const saveID = incID;
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            const val = definition[key];
            if (inArray) {
              key = +key;
            }
            const prop = typeof key === "number" ? key : "'" + key + "'";
            const container = Array.isArray(val) ? "[]" : "{}";
            const isRepArrItem = inArray && i >= keys.length - 1;
            if (isRepArrItem) {
              repEncArrStack.push("");
              repDecArrStack.push("");
              repByteCountStack.push("");
            }
            if (Array.isArray(val)) {
              const newID = incID + 1;
              const repID = repEncArrStack.length <= 1 ? newID : newID + "xn";
              const arrLenStr = "arrLen" + incID;
              if (repEncArrStack.length === 1) {
                strEncodeRefDecs += declareEncodeRef(newID, saveID, prop);
                strDecodeFunction += declareDecodeRef(newID, saveID, prop, "[]");
              }
              const encArrayLength = encodeArrayLength(repID);
              const decArrayLength = decodeArrayLength(arrLenStr);
              const byteArrayLength = getArrayLengthByteCount(repID);
              declareRepeatRefs(isRepArrItem, newID, saveID, prop, container, repEncArrStack, repDecArrStack, repByteCountStack);
              compileSchema(val, true);
              tmpRepEncArr = encArrayLength + processArrayEnd(val, newID, repEncArrStack.pop() + tmpRepEncArr, repEncArrStack.length);
              tmpRepDecArr = decArrayLength + processArrayEnd(val, newID, repDecArrStack.pop() + tmpRepDecArr, repEncArrStack.length, arrLenStr);
              tmpRepByteCount = byteArrayLength + processArrayEnd(val, newID, repByteCountStack.pop() + tmpRepByteCount, repEncArrStack.length);
              if (repEncArrStack.length === 1) {
                strEncodeFunction += tmpRepEncArr;
                tmpRepEncArr = "";
                strDecodeFunction += tmpRepDecArr;
                tmpRepDecArr = "";
                strByteCount += tmpRepByteCount;
                tmpRepByteCount = "";
              }
            } else if (typeof val === "object") {
              const newID = incID + 1;
              if (repEncArrStack.length === 1) {
                strEncodeRefDecs += declareEncodeRef(newID, saveID, prop);
                strDecodeFunction += declareDecodeRef(newID, saveID, prop, "{}");
              }
              declareRepeatRefs(isRepArrItem, newID, saveID, prop, container, repEncArrStack, repDecArrStack, repByteCountStack);
              compileSchema(val, false);
            } else {
              const index = inArray ? "" : "[" + prop + "]";
              const dataType = getDataType(val);
              definition[key] = dataType;
              let repID = getXN(repEncArrStack, saveID);
              if (inArray) {
                repID += isRepArrItem ? "[j" + saveID + "]" : "[" + i + "]";
              }
              repEncArrStack[repEncArrStack.length - 1] += encodeValue(dataType, repID, index, validate);
              repDecArrStack[repDecArrStack.length - 1] += decodeValue(dataType, repID, index);
              repByteCountStack[repByteCountStack.length - 1] += encodeByteCount(dataType, repID, index);
              if (repEncArrStack.length > 1) {
                continue;
              }
              const uniqID = inArray ? saveID + "[" + i + "]" : saveID;
              strEncodeFunction += encodeValue(dataType, uniqID, index, validate);
              strDecodeFunction += decodeValue(dataType, uniqID, index);
              strByteCount += encodeByteCount(dataType, uniqID, index);
            }
          }
        }
        compileSchema(wrappedSchema, false);
        strByteCount = "let byteC=0;".concat(strByteCount, "let wBuffer=buffer??bag.allocUnsafe(byteC);");
        strEncodeFunction = strEncodeRefDecs.concat(strByteCount, strEncodeFunction, "return wBuffer;");
        strDecodeFunction = strDecodeFunction.concat("return ref1['a'];");
        const compiledEncode = new Function("json", "bag", "buffer", strEncodeFunction);
        const compiledDecode = new Function("buffer", "bag", strDecodeFunction);
        return [compiledEncode, compiledDecode];
      }
      addTypeAlias("bool", "boolean");
      function build(schema, validate) {
        const [compiledEncode, compiledDecode] = getCompiledSchema(schema, validate !== null && validate !== void 0 ? validate : validateByDefault);
        return {
          [types_1.CompiledEncode]: compiledEncode,
          [types_1.CompiledDecode]: compiledDecode,
          encode(source, writer) {
            var _a;
            bag.byteOffset = (_a = writer === null || writer === void 0 ? void 0 : writer.offset) !== null && _a !== void 0 ? _a : 0;
            const itemWrapper = { a: source };
            const answer = compiledEncode(itemWrapper, bag, writer === null || writer === void 0 ? void 0 : writer.data);
            if (writer)
              writer.offset = bag.byteOffset;
            return answer;
          },
          decode(source) {
            const reader = types_1.isBufferLike(source) ? { data: source, offset: 0 } : source;
            bag.byteOffset = reader.offset;
            const buffer = buffer_1.Buffer.isBuffer(reader.data) ? reader.data : buffer_1.Buffer.from(reader.data);
            const answer = compiledDecode(buffer, bag);
            reader.offset = bag.byteOffset;
            return answer;
          }
        };
      }
      exports.build = build;
    }
  });

  // dist/index.js
  var require_dist = __commonJS({
    "dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = require_tslib();
      var bio = tslib_1.__importStar(require_codec());
      tslib_1.__exportStar(require_types2(), exports);
      tslib_1.__exportStar(require_codec(), exports);
      exports.default = bio;
    }
  });
  require_dist();
})();
