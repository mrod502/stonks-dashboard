import './App.css';
import { Link } from "react-router-dom";
import MenuBar from './Components/MenuBar/MenuBar'
import { makeStyles } from '@material-ui/core/styles';
import {MenuBarItem} from './Components';
import {Home, Research} from './Pages';
import {
  Routes,
  Route
} from "react-router-dom";

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


const App = () => {

  const classes = useStyles();

  return (
    <div className={`App ${classes.root}`}>
        <MenuBar>
          <Link to=""><MenuBarItem title="Home"/></Link>
          <Link to="/research"><MenuBarItem title="Equity Research"/></Link>
          <MenuBarItem title="Insights"/>
          <MenuBarItem title="Subscribe to events"/>
          <MenuBarItem title="Crypto"/>
        </MenuBar>
        <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="/research" element={<Research/>}/>
        </Routes>
    </div>
  );
}

export default App;
