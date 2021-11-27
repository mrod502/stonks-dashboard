export enum QCond {
  _,
  Greater,
  Less,
  GreaterEq,
  LessEq,
  Eq,
  Neq,
  Regex
}



export default interface QueryProps<T>{
  V:T;
  C:QCond;
  Check:boolean;
}
