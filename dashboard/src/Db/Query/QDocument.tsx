import React from 'react';
import QDocumentProps, { newQDoc } from './QDocumentProps';
import QItem from './QItem';
import Query from './Query'
import { QItemProps, newQItem } from './QItem';
import { DateQueryBuilder, StringQueryBuilder } from './QueryBuilder';
import QueryProps from './QueryProps';

interface QDocumentBuilderProps {
  onChange:(v:QDocumentProps)=>void;
}



export default ({onChange}:QDocumentBuilderProps):React.ReactElement =>{
  const [item, setItem] = React.useState<QItemProps>(newQItem())
  const [title, setTitle] = React.useState<QueryProps<string>>(Query("",0,false))
  const [sectors, setSectors] = React.useState<QueryProps<string>>(Query("",0,false))
  const [symbols, setSymbols] = React.useState<QueryProps<string>>(Query("",0,false))
  const [source, setSource] = React.useState<QueryProps<string>>(Query("",0,false))
  const [contentType, setContentType] = React.useState<QueryProps<string>>(Query("",0,false))
  const [docType, setDocType] = React.useState<QueryProps<string>>(Query("",0,false))
  const [postedDate, setPostedDate] = React.useState<QueryProps<Date>>(Query(new Date,0,false))

  React.useEffect(()=>{
    onChange({
      ...item,
      Title:  title,
      Symbols: symbols,
      Sectors:sectors,
      Source:source,
      ContentType: contentType,
      Type:docType,
      PostedDate: postedDate
    })
  },[item,title,sectors,symbols,source,contentType,docType,postedDate])

  return (
  <>
    <QItem onChange={v=>{setItem(v)}}/>
    <StringQueryBuilder title="Title" onChange={v => {setTitle(v)}}/>
    <StringQueryBuilder title="Symbols" onChange={v => {setSymbols(v)}}/>
    <StringQueryBuilder title="Sectors" onChange={v => {setSectors(v)}}/>
    <StringQueryBuilder title="Source" onChange={v => {setSource(v)}}/>
    <StringQueryBuilder title="ContentType" onChange={v => {setContentType(v)}}/>
    <StringQueryBuilder title="Type" onChange={v => {setDocType(v)}}/>
    <DateQueryBuilder title="PostedDate" onChange={v => {setPostedDate(v)}}/>
  </>)
}