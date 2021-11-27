import React, { useState, useEffect } from 'react';
import {Input, TableCell} from '@material-ui/core'
import Query from './Query'
import QueryProps, {QCond} from './QueryProps';
import { StringQueryBuilder, DateQueryBuilder, BoolQueryBuilder } from './QueryBuilder';

export interface QItemProps {
  Id:QueryProps<string>;
  Created:QueryProps<Date>;
  Class:QueryProps<string>;
  Archived:QueryProps<boolean>;
  Tags?:QueryProps<string>;
}


export const newQItem = () => ({
  Id:Query("",0,false),
  Created:Query(new Date(),0,false),
  Class:Query("",0,false),
  Archived:Query(false,0,false),
  Tags:Query("",0,false),
})

interface QItemBuilderProps{
  onChange:(val:QItemProps)=>void;
}


export default ({onChange}:QItemBuilderProps):React.ReactElement =>{
  const [id, setId] = useState<QueryProps<string>>(Query("",1,false))
  const [created, setCreated] = useState<QueryProps<Date>>(Query(new Date(),1,false))
  const [docClass, setDocClass] = useState<QueryProps<string>>(Query("",1,false))
  const [archived, setArchived] = useState<QueryProps<boolean>>(Query(false,1,false))
  const [tags, setTags] = useState<QueryProps<string>>(Query("",1,false))

  useEffect(()=>{
    onChange({
      Id: id,
      Created: created,
      Class: docClass,
      Archived: archived,
      Tags: tags,
    })
  },[id, created, docClass, archived, tags])


  return (
    <>
    <StringQueryBuilder
      title="Id"
      onChange={setId}
    />
    <DateQueryBuilder
      title="Created"
      onChange={setCreated}
    />
    <StringQueryBuilder
      title="Class"
      onChange={setDocClass}
    />
    <BoolQueryBuilder
      title="Archived"
      onChange={setArchived}
    />
    <StringQueryBuilder
      title="Tags"
      onChange={setTags}
    />
    </>
  )
}