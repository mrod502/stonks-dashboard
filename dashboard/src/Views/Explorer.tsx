import { Grid } from '@material-ui/core';
import React from 'react';
import Tile from '../Components/Utils/Tile';
import DocumentProps from '../Db/Document/DocumentProps';
import QDocument from '../Db/Query/QDocument'
import DocumentTable from '../Db/Document/DocumentTable'
import { fetch } from '../Utils';
import QDocumentProps, { newQDoc } from '../Db/Query/QDocumentProps';
import { Button } from '@material-ui/core';
const queryURI = `http://${process.env.REACT_APP_SCRAPER_IP}:${process.env.REACT_APP_SCRAPER_PORT}/query`


export default () =>{
  const [data,setData] = React.useState<DocumentProps[]>([]);
  const [currentQuery, setCurrentQuery] = React.useState<QDocumentProps>(newQDoc())



  const submitQuery = () =>{
    fetch<DocumentProps[]>(queryURI, "POST", JSON.stringify(currentQuery)).then((value)=>{
      console.log("setting data",value)
      setData(value)
      console.log('data',data)
    },
    (reason) => console.error(reason)
    ).catch(reason => console.error(reason))
  }
  
  
  return (
  <Grid container spacing={1}>
  <Tile>
    <QDocument
      onChange={(q)=>{setCurrentQuery(q);console.log(currentQuery);submitQuery()}}
    />
    <Button onClick ={() =>{submitQuery()}}>Search</Button>
  </Tile>
    <Tile>
      <DocumentTable
        data={data}
      />
    </Tile>
  </Grid>
  )
}