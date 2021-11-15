import React from 'react';
import { Grid } from '@material-ui/core';
import {useEffect, useState} from 'react';
import { getHomeProps,
  HomeProps,
  SignalTable,
  SignalProps,
  RedditTable,
  RedditTableProps,
  SubredditDataProps,
  RedditLinkProps,
  getSubreddit
} from '../Components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    overflowY: 'auto',
    minHeight: '500px',
    height: '500px',
    color: theme.palette.text.secondary,
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [finvizHome, setFinvizHome] = useState<HomeProps>({Signals: {Items: [] as SignalProps[]}})
  const [redditData, setRedditData] = useState<RedditTableProps>({
    data: {
      children: [] as RedditLinkProps[],
    } as SubredditDataProps
  } as RedditTableProps)
  
  useEffect(() => {  
    getHomeProps().then(
      res => {
        console.log(res)
        res.Signals.Items.forEach(
          (val, ix) => val.id = ix
          )
        setFinvizHome((res as HomeProps))
      }
  )
  getSubreddit("wallstreetbets").then(
    res => {
      console.log('response:',res)
      setRedditData(res)
    }
  )
  }, [])
  return (
    <Grid container spacing={3} alignContent="center">
    <Grid item sm={12} md={9} lg={6}>
      <Paper className={classes.paper}>
        <SignalTable Items={finvizHome.Signals.Items}/>
      </Paper>
    </Grid>
    <Grid item sm={12} md={9} lg={6}>
      <Paper className={classes.paper}>
        <RedditTable {...redditData}/>
      </Paper>
    </Grid>
  </Grid>
  )}

export default Home