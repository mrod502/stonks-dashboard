import './App.css';
import {useEffect, useState} from 'react';
import MenuBar from './Components/MenuBar/MenuBar'
import { MenuBarItem } from './Components'
import {Home} from './Views'

import Tile, {useStyles} from './Components/Utils/Tile';

import {Route, Routes} from 'react-router-dom';



const App = () => {

  
  const classes = useStyles();

  return (
    <div className={`App ${classes.root}`}>
        <MenuBar>
          <MenuBarItem title="Home" link='/'/>
          <MenuBarItem title="News" link='news'/>
          <MenuBarItem title="Insights" link='insights'/>
          <MenuBarItem title="Subscribe to events"/>
          <MenuBarItem title="Crypto" link='crypto'/>
        </MenuBar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="crypto" element={<Home/>}/>
        <Route path="insights" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
