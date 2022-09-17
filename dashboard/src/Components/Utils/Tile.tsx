import { Grid } from '@material-ui/core';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

export interface TileProps{
  children: React.ReactNode;
}

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    overflowY: 'auto',
    height: '500px',
    maxHeight: '500px',
    color: theme.palette.text.secondary,
  },
}));


const Tile = ({children}:TileProps)=>{

const classes = useStyles()

  return (
    <Grid item sm={12} md={9} lg={6}>
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </Grid>
  )
}

export default Tile;