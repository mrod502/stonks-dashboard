import React from 'react';
import { newQItem, QItemProps } from './QItem';
import QueryProps from './QueryProps';
import Query from './Query';


export const newQDoc = ():QDocumentProps =>({
  ...newQItem(),
  Title:Query<string>("",0,false),
  Symbols:Query<string>("",0,false),
  Sectors:Query<string>("",0,false),
  Source:Query<string>("",0,false),
  ContentType:Query<string>("",0,false),
  Type:Query<string>("",0,false),
  PostedDate:Query<Date>(new Date(),0,false),
})


export default interface QDocumentProps extends QItemProps{
  Title:QueryProps<string>;
  Symbols:QueryProps<string>;
  Sectors:QueryProps<string>;
  Source:QueryProps<string>;
  ContentType:QueryProps<string>;
  Type:QueryProps<string>;
  PostedDate:QueryProps<Date>;
}
