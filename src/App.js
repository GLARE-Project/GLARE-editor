import React, { useState } from 'react';
import './App.css';
import Home from "./pages/home/Home";
import CreateProject from "./pages/CreateProject/CreateProject";
import UpdateProject from "./pages/UpdateProject/UpdateProject";
import FAQ from "./pages/FAQ/FAQ.js";
import CreateLocation from "./pages/CreateLocation/CreateLocation"
import { Switch, Route, NavLink } from 'react-router-dom';

export const Context = React.createContext();

const Provider = ({ children }) => {

  const [Answers, setAnswers] = useState({
    project_name: "",
    intro_audio: "",
    homepage_image: "",
    hotspots: [],
  });

  const changeAnswer = (propertytName, value) => {
    setAnswers({ ...Answers, ...{ [propertytName]: value } });
  }

  return (
    <Context.Provider value={{
      Answers,
      changeAnswer: (propName, val) => changeAnswer(propName, val),
      setAnswers: answers => setAnswers(answers)
    }}
    >
      {children}
    </Context.Provider>
  );
}


function App() {
  return (
    <Provider>
      <div className="app">
        <nav className={"top-nav"}>
          
          <div className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to='/'>Home</NavLink>
              </li>

              <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                <NavLink className="pure-menu-link" to='/project'>New Project</NavLink>
                <ul className="pure-menu-children">
                  <li className="pure-menu-item">
                    <NavLink className="pure-menu-link" to='/project'>Configuration Editor</NavLink>
                  </li>
                  <li className="pure-menu-item">
                    <NavLink className="pure-menu-link" to='/'>Expert Configuration</NavLink>
                  </li>
                </ul>
              </li>

              <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                <NavLink className="pure-menu-link" to='/update'>Edit Project</NavLink>
                <ul className="pure-menu-children">
                  <li className="pure-menu-item">
                    <NavLink className="pure-menu-link" to='/update'>Project Name</NavLink>
                  </li>
                  <li className="pure-menu-item">
                    <NavLink className="pure-menu-link" to='/'>Poems</NavLink>
                  </li>
                </ul>
              </li>

              <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to='/faq'>FAQ</NavLink>
              </li>
            </ul>
          </div>

        </nav>
        <main className={"content-container"}>
          <section className={"content-section"}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/project" component={CreateProject} />
              <Route path="/hotspot/:id" component={CreateLocation} />
              <Route exact path="/update" component={UpdateProject} />
              <Route exact path="/faq" component={FAQ} />
            </Switch>
          </section>
          <aside className={"project-side"}>
            <h2>New Project</h2>
            <nav className={"side-nav"}>
              <ul>
                <li><NavLink to='/project'>Homepage Content</NavLink></li>
                <li><NavLink to='/menu'>Menu Content</NavLink></li>
              </ul>
            </nav>
            <h3>Hotspots</h3>
            <nav className={"hotspot-nav"}>
              <Context.Consumer>
                {({ Answers }) => (
                  <ul className="hotspot-items">{Answers.hotspots.map((location, index) => {
                    return (
                      <li key={index}><NavLink to={`/hotspot/${index}`}>{location.name}</NavLink></li>
                    )

                  })}</ul>
                )}
              </Context.Consumer>
              <ul>
                <li className="add-hotspot">
                  <NavLink to='/hotspot/new'>Add a Hotspot</NavLink>
                </li>
              </ul>
            </nav>
          </aside>
        </main>
        <footer>
          <ul>
            <li> FAQ | 2017 &copy; Kent State University | Privacy & Terms of Use </li>
            <li><img alt="NEH Logo" id="logo" src="/images/NEH_logo.png" /></li>
            <li><img alt="KSU Logo" id="logo" src="/images/Kent State Logo.png" /></li>

          </ul>
        </footer>
      </div>
    </Provider>
  )
}
export default App;