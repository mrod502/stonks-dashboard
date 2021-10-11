import './App.css';
import {useEffect, useState} from 'react';
import MenuBar from './Components/MenuBar/MenuBar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {
  Home, MenuBarItem, RedditTable
} from './Components'
import { Grid } from '@material-ui/core';
import { getHomeProps, HomeProps, SignalTable, SignalProps } from './Components/Finviz/HomeTable';
import { RedditTableProps, SubredditDataProps, RedditLinkProps, getSubreddit } from './Components/Reddit/RedditTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    overflowY: 'auto',
    maxHeight: '25%',
    height: '25%',
    color: theme.palette.text.secondary,
  },
}));


const App = () => {

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
  
  const classes = useStyles();

  return (
    <div className={`App ${classes.root}`}>
        <MenuBar>
          <MenuBarItem title="Your wife's boyfriend's favorite website" italic/>
          <MenuBarItem title="News"/>
          <MenuBarItem title="Insights"/>
          <MenuBarItem title="Subscribe to events"/>
          <MenuBarItem title="Crypto"/>
        </MenuBar>
        <Grid container spacing={3} alignContent="center">
          <Grid item sm={12} md={9} lg={6}>
            <Paper className={classes.paper}>
              <SignalTable  Items={finvizHome.Signals.Items}/>
            </Paper>
          </Grid>
          <Grid item sm={12} md={9} lg={6}>
            <Paper className={classes.paper}>
              <RedditTable {...redditData}/>
            </Paper>
          </Grid>
        </Grid>
    </div>
  );
}

export default App;
