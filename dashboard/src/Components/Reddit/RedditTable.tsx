import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableBody, TableHead } from '@material-ui/core';
import fetch from '../../Fetch'

const REDDIT_BASE = "reddit"

export const RedditLite = ({}:RedditLiteProps) => {

  return (
    <TableRow>{
      
      }</TableRow>
  )
}


export interface RedditLiteProps {
  title:string;
}
export interface RedditTableProps { 
  data:RedditLiteProps[];

}

const RedditTable = ({data}:RedditTableProps) => {



  return (
    <div>
      <span>Reddit</span>
      <Table>
        <TableHead>
          <TableCell>
            Bruh
          </TableCell>
        </TableHead>
        <TableBody>{
          data.length > 0
          ? data.map( val => <RedditLite {...val}/>)
          : <span>No data available</span>
          }</TableBody>
      </Table>
    </div>
  )
}

export const getSubreddit = async (sub:string):Promise<RedditTableProps> => {
  try{
    console.log(process.env.REACT_APP_SERVER_IP)
    return await fetch<RedditTableProps>(`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${REDDIT_BASE}/${sub}`)
  }catch(err){
    console.error(err)
    return {data:[]} as RedditTableProps;
  }
}


export default RedditTable;