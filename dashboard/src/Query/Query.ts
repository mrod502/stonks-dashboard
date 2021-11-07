export enum Condition{
  _,
  Greater,
  Less,
  GreaterEq,
  LessEq,
  Eq,
  Neq,
  Regex,
};



export interface Query<T>{
  V:T;
  C:Condition;
  S?:string;
  Check:boolean;
};

export const Build = <T>(v:T,c:Condition,s?:string):Query<T> =>{
  let q = {
    V:v,
    C:c,
    Check:true,
  }
  if (s){
    q.S=s
  }
  return q;
}