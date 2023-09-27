import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Order from './components/order';
import MapChart from './components/MapChart';
import MapOrders from './components/MapOrders';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
       <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route exact path="/order" element={ <Order/>} /> 
          <Route exact path="/orderlist" element={ <MapChart/>} /> 
          <Route exact path='/reslist' element={<MapOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
