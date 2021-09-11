import './App.css';
import MenuBar from './Components/MenuBar/MenuBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  Home
} from './Components'

function App() {
  return (
    <Router>
      <div className="App">
        <MenuBar>

        
        </MenuBar>
      </div>

      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
