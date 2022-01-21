import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import Tile from '../Components/Utils/Tile';
import DocumentProps from '../Db/Document/DocumentProps';
import QDocument from '../Db/Query/QDocument'
import DocumentTable from '../Db/Document/DocumentTable'
import { fetch } from '../Utils';
import Scraper from '../Utils/Scraper/Scraper'
import QDocumentProps, { newQDoc } from '../Db/Query/QDocumentProps';
import { Button } from '@material-ui/core';
const queryURI = `http://${process.env.REACT_APP_SCRAPER_IP}:${process.env.REACT_APP_SCRAPER_PORT}/query`


export default () =>{
  const [data,setData] = React.useState<DocumentProps[]>([]);
  const [currentQuery, setCurrentQuery] = React.useState<QDocumentProps>(newQDoc())



  const submitQuery = (q:QDocumentProps) =>{
    fetch<DocumentProps[]>(queryURI, "POST", JSON.stringify(q)).then((value)=>{
      setData(value)

    },
    (reason) => console.error(reason)
    ).catch(reason => console.error(reason))
  }

  useEffect(()=>{
    submitQuery(currentQuery)
  },[currentQuery])
  
  
  return (
    <div>
      <Scraper
        onScrape={setData}
      />
      <Grid container spacing={1}>
        <Tile>
          <QDocument
            onChange={(q)=>{
              setCurrentQuery(q)
            }}
          />
          <Button onClick ={() =>{submitQuery(currentQuery)}}>Search</Button>
        </Tile>
        <Tile>
          <DocumentTable
            data={data}
          />
        </Tile>
      </Grid>
    </div>
  )
}