import React, { useState } from 'react';
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

  const [qry,setQry] = useState<QItemProps>({
    Id: Query("",QCond.Eq,false),
    Created: Query(new Date(),QCond.Eq,false),
    Class: Query("",QCond.Eq,false),
    Archived: Query(false,QCond.Eq,false),
    Tags: Query("",QCond.Eq,false)
  } as QItemProps)


  return (
    <>
    <StringQueryBuilder
      title="Id"
      onChange={q =>{qry.Id = q;setQry(qry)}}
    />
    <DateQueryBuilder
      title="Created"
      onChange={q =>{qry.Created = q;setQry(qry)}}
    />
    <StringQueryBuilder
      title="Class"
      onChange={q =>{qry.Class = q;setQry(qry)}}
    />
    <BoolQueryBuilder
      title="Id"
      onChange={q =>{qry.Archived = q;setQry(qry)}}
    />
    <StringQueryBuilder
      title="Tags"
      onChange={q =>{qry.Tags = q;setQry(qry)}}
    />
    </>
  )
}