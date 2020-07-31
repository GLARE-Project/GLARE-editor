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
    links: []
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
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/project'>New Project</NavLink></li>
            <li><NavLink to='/update'>Edit Project</NavLink></li>
            <li><NavLink to='/faq'>FAQ</NavLink></li>
          </ul>
        </nav>
        <main className={"content-container"}>
          <section className={"content-section"}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/project" component={CreateProject} />
              <Route path="/library/:id" component={CreateLocation} />
              <Route exact path="/update" component={UpdateProject} />
              <Route exact path="/faq" component={FAQ} />
            </Switch>
          </section>
          <aside className={"project-side"}>
            <h2>New Project</h2>
            <nav className={"side-nav"}>
              <ul>
                <li><NavLink to='/project'>Homepage Content</NavLink></li>
                <li><NavLink to='/library/new'>Library Content</NavLink></li>
                <li><NavLink to='/menu'>Menu Content</NavLink></li>
              </ul>
            </nav>
            <h3>Hotspots</h3>
            
            <Context.Consumer>
              {({ Answers }) => (
              <ul>{Answers.hotspots.map((location, index) => {
                return (
                  <li key={index}><NavLink to={`/library/${index}`}>{location.name}</NavLink></li>
                )

              })}</ul>
              )}
              </Context.Consumer>
          </aside>
        </main>
        <footer>
            <p>FAQ | 2017 &copy; Kent State University | Privacy & Terms of Use </p>
        </footer>
      </div>
    </Provider>
  )
}
export default App;