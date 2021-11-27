import QueryProps, {QCond} from './QueryProps'
export type Queryable = string|number|Date|Uint8Array|boolean

export default <T extends Queryable>(v:T ,cond:QCond, check:boolean=true):QueryProps<T> =>{
  return {
    V:v,
    C: cond,
    Check:check,
  }
}