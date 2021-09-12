import React from 'react';
import {fetch} from '../../Utils'

const FINVIZ_HOME = "finviz-home-table";

export interface SignalProps {
	Ticker:string;
	Last:number;
	Change:number;
	Volume:number;
	Signal:string;
}

export interface SignalTableProps {
  Items:SignalProps[];
}


export interface HomeProps {
  Signals:SignalTableProps;

}

export const Signal = ({ Ticker, Last, Change, Volume, Signal }:SignalProps) => (
  <tr>
    <td>{Ticker}</td>
    <td>{Last}</td>
    <td>{Change}</td>
    <td>{Volume}</td>
    <td>{Signal}</td>
  </tr>
)

export const SignalTable = ({ Items }:SignalTableProps) => (
  <table>
    <tbody>
      <tr>
        <th>Ticker</th>
        <th>Last</th>
        <th>Change</th>
        <th>Volume</th>
        <th>Signal</th>
      </tr>{
        Items.length > 0 ? Items.map(value => <Signal {...value}/>) :
        <tr><span>[No data available]</span></tr>
      }</tbody>
  </table>
);

export const getHomeProps = async ():Promise<HomeProps> => {
  try{
    return await fetch<HomeProps>(`https://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${FINVIZ_HOME}`)
  }catch(err){
    return {Signals:{Items:[] as SignalProps[]}} as HomeProps ;
  }
}