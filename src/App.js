import React, { useState } from 'react';
import './App.css';
import Home from "./pages/home/Home";
import CreateProject from "./pages/CreateProject/CreateProject";
import UpdateProject from "./pages/UpdateProject/UpdateProject";
import FAQ from "./pages/FAQ/FAQ.js";
import CreateLocation from "./pages/CreateLocation/CreateLocation"
import { Switch, Route, NavLink } from 'react-router-dom';
import { string, object, number, array, mixed } from 'yup';

export const Context = React.createContext();

const Provider = ({ children }) => {

  let libraryItemSchema = array().of(object().shape({
    item: string().required(),
    item_description: string().required()
  }));

  let librarySchema = array().of(object().shape({
    title: string().required(),
    content_type: number().required(),
    content_items: libraryItemSchema.required()
  }));

  let menuSchema = array().of(object().shape({
    title: string().required(),
    description: string().required(),
    background_image: string().required(),
    descriptive_audio: string().required()
  }));

  let hotspotSchema = array().of(object().shape({
    name: string().required(),
    position: mixed(),
    latitude: number().required().min(-90).max(90),
    longitude: number().required().min(-180).max(80),
    AR_overlay: string().required(),
    panorama_image: string().required(),
    VR_overylay: string().required(),
    overlay_size: number().min(1).max(10),
    overlay_offset_x: number().min(-9).max(9),
    overlay_offset_y: number().min(-9).max(9),
    start_audio: string().required(),
    main_pages: menuSchema,
    media_pages: librarySchema
  }));

  let schema = object().shape({
    project_name: string().required(),
    intro_audio: string(),
    homepage_image: string(),
    hotspots: hotspotSchema.required()
  });

  const [Answers, setAnswers] = useState({
    project_name: "",
    intro_audio: "",
    homepage_image: "",
    hotspots: [],
  });

  const changeAnswer = (propertytName, value) => {
    setAnswers({ ...Answers, ...{ [propertytName]: value } });
  }

  const checkValidity = async() => {
    return await schema.isValid(Answers);;
  }

  return (
    <Context.Provider value={{
      Answers,
      changeAnswer: (propName, val) => changeAnswer(propName, val),
      setAnswers: answers => setAnswers(answers),
      checkValidity: () => checkValidity()
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
            <li><img alt="NEH Logo" id="logo" src={`${process.env.PUBLIC_URL}/images/NEH_logo.png`} /></li>
            <li><img alt="KSU Logo" id="logo" src={`${process.env.PUBLIC_URL}/images/Kent State Logo.png`} /></li>

          </ul>
        </footer>
      </div>
    </Provider>
  )
}
export default App;