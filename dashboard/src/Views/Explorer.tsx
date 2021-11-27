import { Grid } from '@material-ui/core';
import React from 'react';
import Tile from '../Components/Utils/Tile';
import DocumentProps from '../Db/Document/DocumentProps';
import QDocument from '../Db/Query/QDocument'
import DocumentTable from '../Db/Document/DocumentTable'
import { fetch } from '../Utils';

const queryURI = `http://${process.env.REACT_APP_SCRAPER_IP}:${process.env.REACT_APP_SCRAPER_PORT}/query`


export default () =>{
  const [data,setData] = React.useState<DocumentProps[]>([]);
  <Grid container spacing={1}>
  <Tile>
    <QDocument
      onChange={(query) =>{
        fetch<DocumentProps[]>(queryURI, "POST", JSON.stringify(query)).then((value)=>{
          setData(value)
        },
        (reason) => console.error(reason)
        ).catch(reason => console.error(reason))
      }}
    />
  </Tile>
    <Tile>
      <DocumentTable
        data={data}
      />
    </Tile>
  </Grid>
}