import './App.css';
import {useEffect, useState} from 'react';
import MenuBar from './Components/MenuBar/MenuBar'
import { MenuBarItem } from './Components'
import {Home, Explorer} from './Views'

import Tile, {useStyles} from './Components/Utils/Tile';

import {Route, Routes} from 'react-router-dom';



const App = () => {
/*
TODO: 
 - Add Limit Param to queries via header, maybe?
*/
  
  const classes = useStyles();

  return (
    <div className={`App ${classes.root}`}>
        <MenuBar>
          <MenuBarItem title="Home" link='/'/>
          <MenuBarItem title="News" link='news'/>
          <MenuBarItem title="Market Research" link='market-research'/>
          <MenuBarItem title="Subscribe to events"/>
          <MenuBarItem title="Crypto" link='crypto'/>
        </MenuBar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="crypto" element={<Home/>}/>
        <Route path="market-research" element={<Explorer/>}/>
      </Routes>
    </div>
  );
}

export default App;
