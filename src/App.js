import React, { useState, useEffect } from 'react';
import './App.css';
import Home from "./pages/home/Home";
import CreateProject from "./pages/CreateProject/CreateProject";
import Updateold from "./pages/updateold/Updateold";
import FAQ from "./pages/FAQ/FAQ.js";
import CreateLocation from "./pages/CreateLocation/CreateLocation"
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';

export const Context = React.createContext();

const Provider = ({ children }) => {

  let history = useHistory();

  useEffect(() => {

    const fileContent = history.location?.fileContents;
    // configuration passed via upload
    if (fileContent) {
      const fileObject = JSON.parse(fileContent);
      setAnswers(fileObject)
      // improper way of doing it, but can't seem to set files attribute properly
      document.querySelector("#intro-audio").files = createFileList(fileObject.intro_audio);
      document.querySelector("#homepage-img").files = createFileList(fileObject.homepage_image);
    }

  }, [history.location]);

  const [Answers, setAnswers] = useState({
    project_name: "",
    intro_audio: "",
    homepage_image: "",
    hotspots: [],
    links: []
  });

  // create the file list, so the fileName can be set
  // this is to be used to set the file input types
  // ex: input.files = new createFileList('image.png')
  const createFileList = (fileName) => {
    let fileListObj = new DataTransfer();
    // if the fileName passed add that file
    if (fileName) fileListObj.items.add(new File([''], fileName))
    return fileListObj.files
  };

  const changeAnswer = (propertytName, value) => {
    setAnswers({ ...Answers, ...{ [propertytName]: value } });
  }

  return (
    <Context.Provider value={{
      Answers,
      changeAnswer: (propName, val) => changeAnswer(propName, val)
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
        <nav>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/project'>New Project</NavLink></li>
            <li><NavLink to='/updateold'>Edit Project</NavLink></li>
            <li><NavLink to='/faq'>FAQ</NavLink></li>
          </ul>
          <h1 id="title">GLARE</h1>
          <h1>Configuration Editor</h1>
        </nav>
        <main>
          <section>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/project" component={CreateProject} />
              <Route path="/library/:id" component={CreateLocation} />
              <Route exact path="/updateold" component={Updateold} />
              <Route exact path="/faq" component={FAQ} />
            </Switch>
          </section>
          <aside>
            <h2>New Project</h2>
            <nav>
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
      </div>
    </Provider>
  )
}
export default App;