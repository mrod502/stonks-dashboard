import React from 'react';
import DocumentProps from './DocumentProps';
import {TableRow, TableCell} from '@material-ui/core';


export default ({Id, Title, Source, ContentType, PostedDate}:DocumentProps):React.ReactElement=>{
  
  return (
  <TableRow key={Id}>
    <TableCell><a href={Source}>{Title}</a></TableCell>
    <TableCell>{ContentType}</TableCell>
    <TableCell>{PostedDate.toString()}</TableCell>
  </TableRow>
)
}


