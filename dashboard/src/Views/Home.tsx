import React, {useState, useEffect} from 'react';

import {SignalTable, HomeProps, getHomeProps, SignalProps} from '../Components/Finviz/HomeTable';
import Tile from '../Components/Utils/Tile';
import RedditTable, { RedditTableProps, SubredditDataProps, RedditLinkProps, getSubreddit } from '../Components/Reddit/RedditTable';
import {Grid} from '@material-ui/core'

export default ():React.ReactElement =>{

  const [finvizHome, setFinvizHome] = useState<HomeProps>({Signals: {Items: [] as SignalProps[]}})
  const [redditData, setRedditData] = useState<RedditTableProps>({
    data: {
      children: [] as RedditLinkProps[],
    } as SubredditDataProps
  } as RedditTableProps)
  
  useEffect(() => {  
    getHomeProps().then(
      res => {

        res.Signals.Items.forEach(
          (val, ix) => val.id = ix
          )
        setFinvizHome((res as HomeProps))
      }
  )
  getSubreddit("wallstreetbets").then(
    res => {
      setRedditData(res)
    }
  )
  }, [])

  return (
    <Grid container spacing={3} alignContent="center">
    <Tile>
      <SignalTable Items={finvizHome.Signals.Items}/>
    </Tile>
    <Tile>
      <RedditTable {...redditData}/>
    </Tile>
  </Grid>

  )
}