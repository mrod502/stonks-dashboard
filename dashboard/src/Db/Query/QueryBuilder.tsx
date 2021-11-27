import { Checkbox, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Query, {Queryable} from './Query'
import QueryProps, {QCond} from './QueryProps';
import QueryBuilderProps from './QueryBuilderProps';
import { Input } from '@material-ui/core';



const getInputType = <T extends Queryable>(v:T):string =>{
  if (v instanceof Date){
    return "date"
  }
  if (v instanceof Uint8Array){
    return "bytes"
  }

  switch (typeof(v)){
    case "boolean":
      return "checkbox"
    case "number":
      return "number"
    default:
      return "text"
  }
}

interface ConditionSelectorProps {
handleChange:(v:QCond)=>void;
}

const ConditionSelector = ({handleChange}:ConditionSelectorProps):React.ReactElement =>{
  const [selectedVal, setSelectedVal] = React.useState<QCond>(1)
  
  useEffect(() => {
    handleChange(selectedVal)
  }, [selectedVal])

  return (
    <Select
      label="search type"
      onChange={e=>{
        let event = e.target.value as QCond 
        setSelectedVal(event ? event : 1)
      }}
      value={selectedVal}
    >
      <MenuItem value={QCond.Eq}>{"=="}</MenuItem>
      <MenuItem value={QCond.Neq}>{"!="}</MenuItem>
      <MenuItem value={QCond.Greater}>{">"}</MenuItem>
      <MenuItem value={QCond.Less}>{"<"}</MenuItem>
      <MenuItem value={QCond.GreaterEq}>{">="}</MenuItem>  
      <MenuItem value={QCond.LessEq}>{"<="}</MenuItem>  
      <MenuItem value={QCond.Regex}>{".*"}</MenuItem>  
    </Select>
  )
}



export const NumQueryBuilder = ({onChange, title}:QueryBuilderProps<number>)=>{

  const [val,setVal] = useState<number>(0)
  const [cond, setCond] = useState<QCond>(QCond.Eq)
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(()=>{
    onChange({
      V: val,
      C: cond,
      Check: checked
    })
  },[val,cond,checked])
  
  return (
    <div>
      <span>{title}</span>
      <Checkbox onChange={e=>{setChecked(e.target.checked);}}/>
      <ConditionSelector handleChange={v=>{setCond(v)}}/>
      <Input type="number" onChange={e=>{setVal(+ e.target.value)}}/>
    </div>
  )
}

export const ByteArrQueryBuilder = ({onChange, title}:QueryBuilderProps<Uint8Array>)=>{

  const [val,setVal] = useState<Uint8Array>(new Uint8Array())
  const [cond, setCond] = useState<QCond>(QCond.Eq)
  const [checked, setChecked] = useState<boolean>(false)
  const encoder = new TextEncoder()

  useEffect(()=>{
    onChange({
      V: val,
      C: cond,
      Check: checked
    })
  },[val,cond,checked])

  return (
    <div>
      <span>{title}</span>
      <Checkbox onChange={e=>{setChecked(e.target.checked);}}/>
      <ConditionSelector handleChange={v=>{setCond(v)}}/>
      <Input type="text" onChange={e=>{setVal(encoder.encode(e.target.value))}}/>
    </div>
  )
}

export const DateQueryBuilder = ({onChange, title}:QueryBuilderProps<Date>)=>{
  const [val,setVal] = useState<Date>(new Date())
  const [cond, setCond] = useState<QCond>(QCond.Eq)
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(()=>{
    onChange({
      V: val,
      C: cond,
      Check: checked
    })
  },[val,cond,checked])
  return (
    <div>
      <span>{title}</span>
      <Checkbox onChange={e=>{setChecked(e.target.checked);}}/>
      <ConditionSelector handleChange={v=>{setCond(v)}}/>
      <Input type="date" onChange={e=>{setVal(new Date(e.target.value))}}/>
    </div>
  )
}

export const BoolQueryBuilder = ({onChange, title}:QueryBuilderProps<boolean>)=>{

  const [val,setVal] = useState<boolean>(false)
  const [cond, setCond] = useState<QCond>(QCond.Eq)
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(()=>{
    onChange({
      V: val,
      C: cond,
      Check: checked
    })
  },[val,cond,checked])

  return (
    <div>
      <span>{title}</span>
      <Checkbox onChange={e=>{setChecked(e.target.checked);}}/>
      <ConditionSelector handleChange={v=>{setCond(v)}}/>
      <Checkbox onChange={e=>{setVal(e.target.checked)}}/>
    </div>
  )
}

export const StringQueryBuilder = ({onChange, title}:QueryBuilderProps<string>)=>{

  const [val,setVal] = useState<string>("")
  const [cond, setCond] = useState<QCond>(QCond.Eq)
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(()=>{
    onChange({
      V: val,
      C: cond,
      Check: checked
    })
  },[val,cond,checked])

  return (
    <div>
      <span>{title}</span>
      <Checkbox onChange={e=>{setChecked(e.target.checked);}}/>
      <ConditionSelector handleChange={v=>{setCond(v)}}/>
      <Input type="text" onChange={e=>{setVal(e.target.value)}}/>
    </div>
  )
}


