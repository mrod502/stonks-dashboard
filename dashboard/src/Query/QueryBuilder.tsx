import { FormControl, InputLabel, Select, MenuItem, Input} from '@material-ui/core';
import React ,{useState} from 'react';
import {Condition,Build} from './Query';

export const ConditionOptions = {
  '>': Condition.Greater,
  '<': Condition.Less,
  '>=':Condition.GreaterEq,
  '<=':Condition.LessEq,
  '==':Condition.Eq,
  '!=':Condition.Neq,
  '.*':Condition.Regex
}

export interface QueryBuilderProps<T>{
  Label:string;
  SetValue:React.Dispatch<React.SetStateAction<T>>;
  children?:React.ReactNode
}




export const QueryBuilder = <T extends number| string| Date | boolean>({Label,SetValue}:QueryBuilderProps<T>)=>{
  //const [val,setVal] = useState<T>(new T);
  const [checked, setChecked] = useState<boolean>(false);

  //SetValue(Build(val,checked))
  return (
    <div/>
    /*
    <FormControl fullWidth>
      <InputLabel>{Label}</InputLabel>{
        typeof(T) ==='boolean'?
        check
      }<Select
        onChange={(e)=>{SetValue(e.target.value as T)}}
        value={Condition.Eq}
      >{Object.entries(ConditionOptions).map((k,v)=>{
        return(
          <MenuItem value={v}>{k}</MenuItem>
        )
      })}
        </Select>
    </FormControl>*/
  )
}
