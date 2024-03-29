import React, { useState } from 'react';
import './App.css';
import Home from "./pages/home/Home";
import CreateProject from "./pages/CreateProject/CreateProject";
import UpdateProject from "./pages/UpdateProject/UpdateProject";
import FAQ from "./pages/FAQ/FAQ.js";
import CreateLocation from "./pages/CreateLocation/CreateLocation"
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import { string, object, number, array, mixed } from 'yup';
import Graph from "./utils/Graph";

export const Context = React.createContext();

const Provider = ({ children }) => {

  const history = useHistory();

  let libraryItemSchema = array().of(object().shape({
    item: string().required(),
    item_description: string().required()
  }));

  let librarySchema = array().of(object().shape({
    title: string().required(),
    content_type: number().required(),
    content_items: libraryItemSchema.notRequired()
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
    panorama_image: string(),
    overlay: string(),
    overlay_size: number().min(1).max(10),
    overlay_offset_x: number().min(-9).max(9),
    overlay_offset_y: number().min(-9).max(9),
    start_audio: string(),
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

  // map of hotspot panorama_image and overlay blob URLS
  // used to keep the data persistent from one hotspot to another
  const [hotspotImages, setHotspotImage] = useState(new Map());

  const INITAL_HOTSPOT_IMAGES_VALUE = { panorama_image: undefined, overlay: undefined };

  const getHotspotImages = (hotspotIndex) => {
    if (hotspotImages.has(hotspotIndex)) return hotspotImages.get(hotspotIndex);
    return INITAL_HOTSPOT_IMAGES_VALUE;
  };

  const changeHotspotImage = (hotspotIndex, propertytName, value) => {
    setHotspotImage(hotspotImages => {
      // if a value exists, only adjusts the give property
      if (hotspotImages.has(hotspotIndex)) {
        const previousValue = hotspotImages.get(hotspotIndex);
        hotspotImages.set(hotspotIndex, { ...previousValue, ...{ [propertytName]: value } })
      // otherwise make sure all required properties exists too
      } else {
        hotspotImages.set(hotspotIndex, { ...INITAL_HOTSPOT_IMAGES_VALUE, ...{ [propertytName]: value } });
      }
      return hotspotImages;
    });
  };

  const [hotspotGraph] = useState(new Graph());

  const changeAnswer = (propertytName, value) => {
    setAnswers({ ...Answers, ...{ [propertytName]: value } });
  }

  const checkValidity = async () => {
    return await schema.isValid(Answers);;
  }

  // generate the graph when the hotspots are loaded all at once
  const generateGraph = ({ hotspots }) => {
    hotspots.filter(hotspot => !hotspot.isSubHotspot).forEach((_, hotspotIndex) => {
      hotspotGraph.addVertex(hotspots, hotspotIndex);
    });
  }

  // since the function changes state directly
  // we should change state and rebuilt the graph
  const directlyChangeAnswers = (answers) => {
    setAnswers(answers);
    generateGraph(answers);
  };

  const loadExample = async () => {
    await fetch(process.env.PUBLIC_URL + "/markers.json")
      .then(res => res.json())
      .then(res => {
        if (res.hasOwnProperty("hotspots")) {
          directlyChangeAnswers(res);
          history.push({
            pathname: '/project'
          })
        }
      });
  }

  return (
    <Context.Provider value={{
      Answers,
      changeAnswer: (propName, val) => changeAnswer(propName, val),
      setAnswers: answers => directlyChangeAnswers(answers),
      checkValidity: () => checkValidity(),
      loadExample: () => loadExample(),
      hotspotGraph: hotspotGraph,
      getHotspotImages: (index) => getHotspotImages(index),
      changeHotspotImage: (index, propName, val) => changeHotspotImage(index, propName, val)
    }}
    >
      {children}
    </Context.Provider>
  );
}


const App = () => {

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
                  <Context.Consumer>
                    {({ loadExample }) => {
                      return (
                        <li className="pure-menu-item">
                          <div tabIndex="0" className="pure-menu-link" onClick={loadExample}>Expert Configuration</div>
                        </li>
                      )
                    }}
                  </Context.Consumer>
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