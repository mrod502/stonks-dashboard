import React from "react";
import Document from './Document';
import DocumentProps from "./DocumentProps";
import {Table, TableRow, TableHead, TableCell, TableBody} from '@material-ui/core'


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
      </TableHead>
      <TableBody>{
        data.map(v =>{
          return <Document {...v}/>
        })
      }
      </TableBody>
    </Table>

  )
}

/*
 */