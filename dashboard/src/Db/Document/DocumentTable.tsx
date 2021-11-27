import React from "react";
import Document from './Document';
import DocumentProps from "./DocumentProps";
import {Table, TableRow, TableHead, TableCell} from '@material-ui/core'


interface DocumentTableProps {
  Title?:string;
  data:DocumentProps[];
}

export default ({data}:DocumentTableProps):React.ReactElement =>{

  return (
    <Table>
      <TableHead>
        <TableCell>Title</TableCell>
        <TableCell>ContentType</TableCell>
        <TableCell>Posted Date</TableCell>
      </TableHead>{
        data.map(v =>{
          <Document {...v}/>
        })
      }
    </Table>

  )
}