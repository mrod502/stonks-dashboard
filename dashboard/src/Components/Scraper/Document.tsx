import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import { TableBody, TableHead } from '@material-ui/core';
import React from 'react';

export interface DocumentProps {
  Title:string;
  Symbols:string[];
  Sectors:string[];
  Source:string;
  ContentType:string;
  Type:string;
  PostedDate:Date;

}


const tableStyle  = {
  paper : {
  overflowY: 'auto',
  maxHeight: '50%',
  }
} as React.CSSProperties




export const Document =  ({Title,Symbols,Source,ContentType}:DocumentProps) => {

return (
  <TableRow>
    <TableCell><a href={Source}>{Title}</a></TableCell>
    <TableCell>{Symbols.map(v =>(<span>{v}</span>))}</TableCell>
    <TableCell><span>{ContentType.split("/")[1] || "?"}</span></TableCell>
  </TableRow>
)
}

export interface DocTableProps {
  data:DocumentProps[];
}

export const DocTable = ({data}:DocTableProps) => {
 
  return (
    <div>
      <span style={{position: 'sticky'}}>Reddit</span>
      <Table style={tableStyle} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Symbols</TableCell>
            <TableCell>Content Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{
          data.length > 0
          ? data.map( val => <Document {...val}/>)
          : <TableRow><TableCell align="center" colSpan={3}>No data available</TableCell></TableRow>
          }</TableBody>
      </Table>
    </div>
  )
}

export const Db = () => {
  return <div/>
}