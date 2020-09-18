import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MapField from "./Map/MapField";
import LibraryField from "./Library/LibraryField";
import MenuField from "./Menu/MenuField";
import { Context } from "./../../App";
import createFileList from "./../../utils/utils";
import './CreateLocation.css';


function CreateLocation( { history } ) {

  const { Answers, changeAnswer } = useContext(Context);

  const { id } = useParams();

  const [currentID, setCurrentID] = useState(id);

  const INITIAL_STATE = {
    // location related
    name: "",
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
  };
  const [hotspotData, setHotspotData] = useState(INITIAL_STATE);

  // on load, if the id exists, load its data
  useEffect(() => {

    if (id !== "new" && Answers.hotspots.length > id) {
      const hotspotData = Answers.hotspots[id];
      setHotspotData(hotspotData);
      // improper way of doing it, but can't seem to set files attribute properly
      document.querySelector("#ar-overlay").files = createFileList(hotspotData.AR_overlay);
      document.querySelector("#panorama-img").files = createFileList(hotspotData.panorama_image);
      document.querySelector("#vr-overlay").files = createFileList(hotspotData.VR_overylay);
      document.querySelector("#narration-audio").files = createFileList(hotspotData.start_audio);
    } else if (id !== currentID) {
      // update the state to match the parameter
      setCurrentID(id);
      // and reset data
      setHotspotData(INITIAL_STATE);

    }
  }, [Answers.hotspots, id, currentID, INITIAL_STATE])

  const handleProjectSave = updatedAnswer => {
    // we add the new item to the array and set it to the current hotspot
    if (currentID === "new") {
      setCurrentID(Answers.hotspots.length);
      changeAnswer("hotspots", [...Answers.hotspots, updatedAnswer]);
      history.replace("/hotspot/" + Answers.hotspots.length)
    // we only need to update the existing data
    } else {
      let old = Answers.hotspots;
      old[currentID] = updatedAnswer;
      changeAnswer("hotspots", old)
    }
  };

  // if a value is changed it must:
  const handleChange = (objectName, value) => {
    // set the new answer value
    const newAnswer = { ...hotspotData, ...{ [objectName]: value } };
    setHotspotData(newAnswer);
    handleProjectSave(newAnswer)
  };

  const handleLocation = (lat, lng) => {
    const newAnswer = {
      ...hotspotData,
      latitude: lat,
      longitude: lng
    };
    setHotspotData(newAnswer);
    handleProjectSave(newAnswer);
  }

  return (
    <div className="newConfigMain">
      <div className="pure-form pure-form-aligned">
       <div className="pure-control-group required">
        <label htmlFor="hotspot-name">Hotspot name</label>
        <input
          type="text" id="hotspot-name" placeholder="enter name"
          value={hotspotData.name}
          onChange={e => handleChange("name", e.target.value)}
        />
      </div>

      <MapField
        handleLocation={handleLocation}
        currentLatitude={hotspotData.latitude}
        currentLongitude={hotspotData.longitude}
      />

      <div className="pure-control-group required">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="number" id="latitude" placeholder="enter latitude" min={-90} max={90}
          value={hotspotData.latitude != null ? hotspotData.latitude : ""}
          onChange={e => handleChange("latitude", e.target.value)}
        />
      </div>

      <div className="pure-control-group required">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="number" id="longitude" placeholder="enter longitude" min={-180} max={80}
          value={hotspotData.longitude != null ? hotspotData.longitude : ""}
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

      <LibraryField 
        handleLibrary={data => handleChange("media_pages", data)}
        libraryPages={hotspotData.media_pages}
      />

      <MenuField 
        handleMenu={data => handleChange("main_pages", data)}
        menuItems={hotspotData.main_pages}
      />

      </div>
    </div>
  );
}

export default CreateLocation;