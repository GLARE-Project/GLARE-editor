import React, { useState } from 'react';
import MapField from "./MapField";
import LibraryField from "./LibraryField";


import './CreateLocation.css';

function CreateLocation( { handleProjectSave, index } ) {
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

  // if a value is changed it must:
  const handleChange = (objectName, value) => {
    // set the new answer value
    const newAnswer = { ...Answers, ...{ [objectName]: value } };
    setAnswers(newAnswer);
    handleProjectSave(newAnswer);
  };

  const handleLocation = (lat, lng) => {
    const newAnswer = { ...Answers, 
      ...{
        latitude: lat,
        longitude: lng 
      }
    };
    setAnswers(newAnswer);
    handleProjectSave(newAnswer);
  }

  const handleLibrary = (data) => {
    const newAnswer = { ...Answers, 
      ...{
        media_pages: data
      }
    };
    setAnswers(newAnswer);
    handleProjectSave(newAnswer);
  };
  
  return (
    <div className="newConfigMain">
      <div>Position #{Answers.position} </div>
      <br />

      Hotspot name:
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

      Latitude:
      <input
        type="number" placeholder="enter latitude"
        value={Answers.latitude != null ? Answers.latitude : ""}
        onChange={e => handleChange("latitude", e.target.value)}
      />

      Longitude:
      <input type="number" placeholder="enter longitude"
        value={Answers.longitude != null ? Answers.longitude : ""}
        onChange={e => handleChange("longitude", e.target.value)}
      />
      <br />

      AR Overlay:
      <input
        type="file" placeholder="select image" accept="image/*"
        onChange={e => handleChange("AR_overlay", e.target.files[0]['name'])}
      />
      <br />

      Panorama image:
      <input
        type="file" placeholder="select image" accept="image/*"
        onChange={e => handleChange("panorama_image", e.target.files[0]['name'])}
      />
      <br />

      VR Overlay:
      <input
        type="file" placeholder="select image" accept="image/*"
        onChange={e => handleChange("VR_overylay", e.target.files[0]['name'])}
      />
      <br />

      Narration Audio:
      <input
        type="file" placeholder="select audio" accept="audio/*"
        onChange={e => handleChange("start_audio", e.target.files[0]['name'])}
      />
      <br />


      <LibraryField handleLibrarySave={handleLibrary} />

    </div>
  );
}

export default CreateLocation;