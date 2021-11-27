import {encode, decode} from '@msgpack/msgpack';


export class Serializer {
  constructor(){

  }
  encode(val:any):Uint8Array{
    return encode(val)
  }

  decode<T>(b:Uint8Array):T{
    return decode(b) as T;

  }
}