import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableBody, TableHead } from '@material-ui/core';
import fetch from '../../Fetch'

const REDDIT_BASE = "reddit"

export const RedditLite = ({
  name,
  body,
  title,
  ups,
  downs,
  permalink,
}:T3Data) => {
  
  return (
    <TableRow>
        <TableCell><a href={`https://www.reddit.com${permalink}`}>{title}</a></TableCell>
        <TableCell>{ups}</TableCell>
        <TableCell>{downs}</TableCell>
      </TableRow>
  )
}

export interface T3Data {
  all_awardings: string;
  author: string;
  author_fullname: string;
  body:string;
  controversiality:number;
  created:number;
  depth:number;
  ups:number;
  downs:number;
  gilded:number;
  id:string;
  link_id:string;
  name:string;
  title:string;
  parent_id:string;
  permalink:string;
}

export interface RedditLinkProps {
  title:string;
  data: T3Data;
}

export interface SubredditDataProps {
  after:string;
  before:string;
  children:RedditLinkProps[];
  dist:number;
  modhash:string;
}

export interface RedditTableProps { 
  data:SubredditDataProps;
  kind?:string;
  sr?:string;

}

const RedditTable = ({data}:RedditTableProps) => {



  return (
    <div>
      <span>Reddit</span>
      <Table>
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>Ups</TableCell>
          <TableCell>Downs</TableCell>
        </TableHead>
        <TableBody>{
          data.children.length > 0
          ? data.children.map( val => <RedditLite {...val.data}/>)
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
    return {
      data: {
        children: [] as RedditLinkProps[],
      } as SubredditDataProps
    } as RedditTableProps;
  }
}


export default RedditTable;