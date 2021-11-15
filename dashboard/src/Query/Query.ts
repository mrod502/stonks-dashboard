export enum Condition{
  _,
  Greater,
  Less,
  GreaterEq,
  LessEq,
  Eq,
  Neq,
  Regex,
  Contains,
};

export interface QueryBase{
  Limit:number;
}



export interface Query<T> extends QueryBase{
  V:T;
  C:Condition;
  Check:boolean;
};

export const Build = <T>(v:T,c:Condition,check?:boolean):Query<T> =>{

  let q = {
    V:v,
    C:c,
    Check: (check == undefined) ? true : check,
  } as Query<T>
    return q;
}
