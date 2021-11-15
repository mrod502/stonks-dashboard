import React from 'react';
import { Grid } from '@material-ui/core';
import { QueryBuilder } from '../Query/QueryBuilder';
import {DocumentQuery,Blank} from '../Query/Document'

export const Research = ()=>{
  const [query,setQuery] = React.useState<DocumentQuery>(Blank());

  return (
    <div/>
   /* <Grid container spacing={3} alignContent="center">
      <Grid item sm={12}>
        <QueryBuilder<string> SetValue={(v)=>{query.Title =v;setQuery(query)}}/>
      </Grid>
    </Grid>
    */
  )
}