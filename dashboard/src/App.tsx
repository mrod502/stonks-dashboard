import './App.css';
import MenuBar from './Components/MenuBar/MenuBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {
  Home
} from './Components'

function App() {
  return (

      <div className="App">
        <MenuBar>

        </MenuBar>
      </div>

  );
}

export default App;
