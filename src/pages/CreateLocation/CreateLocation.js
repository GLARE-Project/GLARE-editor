import React, { useState, useEffect } from 'react';
import MapField from "./MapField";
import LibraryField from "./LibraryField";

import './CreateLocation.css';

function CreateLocation({ handleProjectSave, index, locationState }) {
  const [Answers, setAnswers] = useState({
    // location related
    name: "",
    position: index + 1,
    latitude: 0,
    longitude: 0,
    // AR related
    AR_overlay: "",
    // VR related
    panorama_image: "",
    VR_overylay: "",
    overlay_size: 10,
    overlay_offset_x: 0,
    overlay_offset_y: 0,
    // audio related
    start_audio: "",
    // the links
    main_pages: [],
    // the library
    media_pages: []
  });


  useEffect(() => {

    if(locationState !== Answers) {
        setAnswers(locationState)
    }

  },[locationState, Answers]);

  // if a value is changed it must:
  const handleChange = (objectName, value) => {
    // set the new answer value
    const newAnswer = { ...Answers, ...{ [objectName]: value } };
    setAnswers(newAnswer);
    handleProjectSave(newAnswer);
  };

  const handleLocation = (lat, lng) => {
    const newAnswer = {
      ...Answers,
      ...{
        latitude: lat,
        longitude: lng
      }
    };
    setAnswers(newAnswer);
    handleProjectSave(newAnswer);
  }

  const handleLibrary = (data) => {
    const newAnswer = {
      ...Answers,
      ...{
        media_pages: data
      }
    };
    setAnswers(newAnswer);
    handleProjectSave(newAnswer);
  };

  return (
    <div className="newConfigMain">
      <legend>Position #{Answers.position} </legend>

      <div className="pure-control-group">
        <label htmlFor="hotspot-name">Hotspot name</label>
        <input
          type="text" id="hotspot-name" placeholder="enter name"
          value={Answers.name}
          onChange={e => handleChange("name", e.target.value)}
        />
      </div>

      <MapField
        handleLocation={handleLocation}
        currentLatitude={Answers.latitude}
        currentLongitude={Answers.longitude}
      />

      <div className="pure-control-group">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="number" id="latitude" placeholder="enter latitude"
          value={Answers.latitude != null ? Answers.latitude : ""}
          onChange={e => handleChange("latitude", e.target.value)}
        />
      </div>

      <div className="pure-control-group">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="number" id="longitude" placeholder="enter longitude"
          value={Answers.longitude != null ? Answers.longitude : ""}
          onChange={e => handleChange("longitude", e.target.value)}
        />
      </div>


      <div className="pure-control-group">
        <label htmlFor="ar-overlay">AR Overlay</label>
        <input
          type="file" id="ar-overlay" placeholder="select image" accept="image/*"
          onChange={e => handleChange("AR_overlay", e.target.files[0]['name'])}
        />
      </div>


      <div className="pure-control-group">
        <label htmlFor="panorama-img">Panorama image</label>
        <input
          type="file" id="panorama-img" placeholder="select image" accept="image/*"
          onChange={e => handleChange("panorama_image", e.target.files[0]['name'])}
        />
      </div>


      <div className="pure-control-group">
        <label htmlFor="vr-overlay">VR Overlay</label>
        <input
          type="file" id="vr-overlay" placeholder="select image" accept="image/*"
          onChange={e => handleChange("VR_overylay", e.target.files[0]['name'])}
        />
      </div>

      <div className="pure-control-group">
        <label htmlFor="narration-audio">Narration Audio</label>
        <input
          type="file" id="narration-audio" placeholder="select audio" accept="audio/*"
          onChange={e => handleChange("start_audio", e.target.files[0]['name'])}
        />
      </div>

      <LibraryField handleLibrarySave={handleLibrary} />
    </div>
  );
}

export default CreateLocation;