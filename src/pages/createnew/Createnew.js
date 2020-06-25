import React, {useState} from 'react';
import './createnew.css';
function Createnew() {
    const [Answers, setAnswers] = useState({
        name: null, 
        latitude: null,
        longitude: null,
        image: null,
        audio: null
      });
    
      const [downloadURL, setURL] = useState(null);
      
    
      // generate the download URL
      const generateURL = () => {
        const jsonData = JSON.stringify(Answers);
        // turn it into a blob object
        const blob = new Blob([jsonData], {type: "application/json"})
        // create blob url for the browser to download
        return URL.createObjectURL(blob);
      };
    
      
      // if a value is changed it must:
      const handleChange = (objectName, value) => {
        // set the new answer value
        setAnswers({ ...Answers, ...{[objectName]: value} });
        // regenerate the URL
        setURL(generateURL());
      };
    
    
      return (
        <div className="newConfigMain">
          <div className="header">
          <h3>Please feel free to add a new configuration below!</h3>
            <form >
                <pre>
              Name : 
              <input type="text" placeholder="enter name"
                value={Answers.name} 
                onChange={e => handleChange("name", e.target.value)}
              />
    
              <br></br>
    
              <textarea name='userConfigData' rows="10" cols="70" 
                placeholder=" MAP "/>
              <br></br>
              <br></br>
              Latitude : 
              <input type="number" placeholder="enter latitude"
              value={Answers.latitude} 
              onChange={e => handleChange("latitude", e.target.value)}/>
              Longitude : 
              <input type="number" placeholder="enter longitude"
              value={Answers.longitude} 
              onChange={e => handleChange("longitude", e.target.value)}
              />
              <br></br>
              Image : 
              <input type="file" placeholder="select image" accept="image/png, image/jpeg"
              onChange={e => handleChange("image", e.target.value)}></input>
              
              Audio :
             <input type="file" placeholder="select audio" accept="audio/*"
             onChange={e => handleChange("audio", e.target.value)}></input>
             <br></br>
    {downloadURL && (<a href={downloadURL} download="markers.json">Download File</a>)}
    </pre>
    </form>
    </div>
    </div>
      );
    }
export default Createnew;