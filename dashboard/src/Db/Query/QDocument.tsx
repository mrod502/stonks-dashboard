import React from 'react';
import QDocumentProps, { newQDoc } from './QDocumentProps';
import QItem from './QItem';
import { QItemProps, newQItem } from './QItem';
import { DateQueryBuilder, StringQueryBuilder } from './QueryBuilder';

interface QDocumentBuilderProps {
  onChange:(v:QDocumentProps)=>void;
}



export default ({onChange}:QDocumentBuilderProps):React.ReactElement =>{
  const [item, setItem] = React.useState<QItemProps>(newQItem())

  const [doc, setDoc] = React.useState<QDocumentProps>(newQDoc())
  
  return (
  <>
    <QItem onChange={v=>{setItem(v);onChange(doc)}}/>
    <StringQueryBuilder title="Title" onChange={v => {doc.Title = v;setDoc(doc);onChange(doc)}}/>
    <StringQueryBuilder title="Symbols" onChange={v => {doc.Symbols = v;setDoc(doc);onChange(doc)}}/>
    <StringQueryBuilder title="Sectors" onChange={v => {doc.Sectors = v;setDoc(doc);onChange(doc)}}/>
    <StringQueryBuilder title="Source" onChange={v => {doc.Source = v;setDoc(doc);onChange(doc)}}/>
    <StringQueryBuilder title="ContentType" onChange={v => {doc.ContentType = v;setDoc(doc);onChange(doc)}}/>
    <StringQueryBuilder title="Type" onChange={v => {doc.Type = v;setDoc(doc);onChange(doc)}}/>
    <DateQueryBuilder title="PostedDate" onChange={v => {doc.PostedDate = v;setDoc(doc);onChange(doc)}}/>
  </>)
}