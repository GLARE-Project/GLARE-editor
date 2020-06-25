import React, { useState } from 'react';
import MapField from "./MapField";

import './createnew.css';

function Createnew() {
  const [Answers, setAnswers] = useState({
    // location related
    name: "",
    position: null,
    latitude: 0,
    longitude: 0,
    // AR related
    AR_overlay: null,
    // VR related
    panorama_image: null,
    VR_overylay: null,
    overlay_size: 10,
    overlay_offset_x: 0,
    overlay_offset_y: 0,
    // audio related
    audio: null
  });

  const [downloadURL, setURL] = useState(null);


  // generate the download URL
  const generateURL = () => {
    const jsonData = JSON.stringify(Answers);
    // turn it into a blob object
    const blob = new Blob([jsonData], { type: "application/json" })
    // create blob url for the browser to download
    return URL.createObjectURL(blob);
  };


  // if a value is changed it must:
  const handleChange = (objectName, value) => {
    // set the new answer value
    setAnswers({ ...Answers, ...{ [objectName]: value } });
    // regenerate the URL
    setURL(generateURL());
  };

  const handleLocation = (lat, lng) => {
    setAnswers({ ...Answers, 
      ...{
        latitude: lat,
        longitude: lng 
      }
    });
  }
  

  return (
    <div className="newConfigMain">
      <div className="header">
        <h3>Please feel free to add a new configuration below!</h3>
      </div>

      Name :
      <input
        type="text" placeholder="enter name"
        value={Answers.name}
        onChange={e => handleChange("name", e.target.value)}
      />
      <br />

      <MapField 
        handleLocation={handleLocation}
        currentLatitude={Answers.latitude}
        currentLongitude={Answers.longitude}
      />
      <br />

      Latitude :
      <input
        type="number" placeholder="enter latitude"
        value={Answers.latitude != null ? Answers.latitude : ""}
        onChange={e => handleChange("latitude", e.target.value)}
      />

      Longitude :
      <input type="number" placeholder="enter longitude"
        value={Answers.longitude != null ? Answers.longitude : ""}
        onChange={e => handleChange("longitude", e.target.value)}
      />
      <br />

      Image :
      <input
        type="file" placeholder="select image" accept="image/*"
        onChange={e => handleChange("image", e.target.value)}
      />
      <br />

      Audio :
      <input
        type="file" placeholder="select audio" accept="audio/*"
        onChange={e => handleChange("audio", e.target.value)}
      />
      <br />

      {downloadURL && (<a href={downloadURL} download="markers.json">Download File</a>)}
    </div>
  );
}

export default Createnew;