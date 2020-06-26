import React from 'react';
import './App.css';
import Home from "./pages/home/Home";
import CreateProject from "./pages/CreateProject/CreateProject";
import Updateold from "./pages/updateold/Updateold";
import { Switch, Route, NavLink } from 'react-router-dom';
function App() {
  return (
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
          <Route exact path="/createnew" component={CreateProject} />
          <Route exact path="/updateold" component={Updateold} />
        </Switch>
      </main>
    </div>
  )
}
export default App;