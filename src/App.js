import React from 'react';
import './App.css';
import Home from "./pages/home/Home.js";
import Createnew from "./pages/createnew/Createnew.js";
import Updateold from "./pages/updateold/Updateold.js";
import {Switch, Route, NavLink} from 'react-router-dom';
function App() {
  return(
    <div className="app">
      <nav>
    <h1>GLARE Configuration Editor</h1>
    <ul>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/createnew'>Create New</NavLink></li>
    <li><NavLink to='/updateold'>Update Existing</NavLink></li>
    </ul>
    </nav>
    <main>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/createnew" component={Createnew}/>
      <Route exact path="/updateold" component={Updateold} />
      </Switch>
    </main>
    </div>
  )
}
export default App;