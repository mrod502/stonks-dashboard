import React from 'react';
import { Button, Input } from '@material-ui/core';
import Fetch from '../../Fetch';
import DocumentProps from '../../Db/Document/DocumentProps';
import ScraperProps from './ScraperProps'
export default ({onScrape}:ScraperProps) =>{
  const [symbol, setSymbol] = React.useState<string>("")

  React.useEffect(()=>{
    console.info(`symbol:${symbol}`)
  },[symbol])

  return (
  <div>
    <span><strong>Scrape Search Engines</strong></span>
    <br/>
    <Input
      type="text"
      placeholder='input a symbol'
      onChange={e => setSymbol(e.target.value)}
    />
    <Button
    onClick={(e)=>{Fetch<DocumentProps[]>(`http://192.168.50.115:8849/scrape/${symbol}/pdf`,"GET").then(v=>{
    console.info(v)
    onScrape && onScrape(v)

    }).catch(console.error)}}
    >Scrape</Button>
  </div>
  )
}