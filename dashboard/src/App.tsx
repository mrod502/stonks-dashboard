import './App.css';
import {useEffect, useState} from 'react';
import MenuBar from './Components/MenuBar/MenuBar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {
  Home, MenuBarItem
} from './Components'
import { Grid } from '@material-ui/core';
import { getHomeProps, HomeProps, SignalTable, SignalProps } from './Components/Finviz/HomeTable';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const  App =() => {

  const [finvizHome, setFinvizHome] = useState<HomeProps>({Signals: {Items: [] as SignalProps[]}})
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
    
  }, [])

  const classes = useStyles();
  return (
    <div className={`App ${classes.root}`}>

        <MenuBar>
          <MenuBarItem title="Hello"/>
        </MenuBar>
        <Grid container spacing={3} alignContent="center">
          <Grid item sm={12} md={9} lg={6}>
            <Paper className={classes.paper}>
              <SignalTable  Items={finvizHome.Signals.Items}/>
            </Paper>
          </Grid>

        </Grid>

    </div>
  );
}

export default App;
