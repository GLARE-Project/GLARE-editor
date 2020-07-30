import React from 'react';
import './App.css';
import Home from "./pages/home/Home";
import CreateProject from "./pages/CreateProject/CreateProject";
import Updateold from "./pages/updateold/Updateold";
import FAQ from "./pages/FAQ/FAQ.js";
import { Switch, Route, NavLink } from 'react-router-dom';
function App() {
  return (
    <div className="app">
      <nav>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/createnew'>New Project</NavLink></li>
          <li><NavLink to='/updateold'>Edit Project</NavLink></li>
          <li><NavLink to='/faq'>FAQ</NavLink></li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createnew" component={CreateProject} />
          <Route exact path="/updateold" component={Updateold} />
          <Route exact path="/faq" component={FAQ} />
        </Switch>
      </main>
</div>
  )
}
export default App;