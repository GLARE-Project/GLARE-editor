import React, { useState, useContext, useEffect, Suspense, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { CubeMapVR } from "@chrisdesigns/glare-viewer";
import { Canvas } from 'react-three-fiber';
import { Html } from 'drei'
import MapField from "./Map/MapField";
import LibraryField from "./Library/LibraryField";
import MenuField from "./Menu/MenuField";
import { Context } from "./../../App";
import createFileList from "./../../utils/utils";
import './CreateLocation.css';

function CreateLocation({ history }) {

  const { Answers, changeAnswer, hotspotGraph, getHotspotImages, changeHotspotImage } = useContext(Context);

  const { hotspots } = Answers;

  const { id } = useParams();

  const INITIAL_STATE = useMemo(() => {
    return {
      // location related
      name: "",
      position: null,
      latitude: 0,
      longitude: 0,
      overlay: "",
      virtual_object: "",
      isSubHotspot: false,
      // VR related
      panorama_image: "",
      overlay_size: 10,
      overlay_offset_x: 0,
      overlay_offset_y: 0,
      // audio related
      start_audio: "",
      // the links
      main_pages: [],
      // the library
      media_pages: []
    }
  }, []);

  // based on http://wiki.gis.com/wiki/index.php/Decimal_degrees 11.1m accuracy
  const LongLatStep = 0.0001;

  const [hotspotData, setHotspotData] = useState(INITIAL_STATE);
  const [currentPano, setPano] = useState();
  const [currentOverlay, setOverlay] = useState();
  const [hasChanged, setHasChanged] = useState(false);

  // on load, if the id exists, load its data
  useEffect(() => {

    // load the hotspot at the id's postiion if it exists
    if (id !== "new" && hotspots.length > parseInt(id)) {
      const hotspotData = hotspots[parseInt(id)];
      setHotspotData(hotspotData);
      // TODO: check to see if a blob is valid before serving it
      // blobs can be unloaded when the document is unloaded
      const { panorama_image, overlay } = getHotspotImages(parseInt(id));
      setPano(panorama_image);
      setOverlay(overlay);
      // improper way of doing it, but can't seem to set files attribute properly
      document.querySelector("#panorama-img").files = createFileList(hotspotData.panorama_image);
      document.querySelector("#overlay").files = createFileList(hotspotData.overlay);
      document.querySelector("#narration-audio").files = createFileList(hotspotData.start_audio);
      document.querySelector("#virtual-object").files = createFileList(hotspotData.virtual_object);
      setHasChanged(true);
    } else if (id === "new" && hasChanged) {
      setHotspotData(INITIAL_STATE);
      document.querySelector("#panorama-img").files = createFileList([]);
      document.querySelector("#overlay").files = createFileList([]);
      document.querySelector("#narration-audio").files = createFileList([]);
      document.querySelector("#virtual-object").files = createFileList([]);
      setPano("");
      setOverlay("");
      setHasChanged(false);

    }
  }, [hotspots, id, INITIAL_STATE, hasChanged, getHotspotImages]);

  const handleProjectSave = updatedAnswer => {
    // we add the new item to the array and set it's position
    if (id === "new") {
      const position = hotspots.length;
      changeAnswer("hotspots", [...hotspots, { ...updatedAnswer, position }]);
      history.replace("/hotspot/" + position);
      // we only need to update the existing data
    } else {
      let old = hotspots;
      old[parseInt(id)] = updatedAnswer;
      changeAnswer("hotspots", old);
      // if a valid id and hasn't been added to the graph adjancy list with valid coordinates
      // then add it as a vertex (could warn the users here too)
      if (!hotspotGraph.adjancyList.has(id) && old.latitude !== 0 && old.longitude !== 0)
        hotspotGraph.addVertex(old, parseInt(id));
    }
  };

  // if a value is changed it must:
  const handleChange = (objectName, value) => {
    // set the new answer value
    const newAnswer = { ...hotspotData, ...{ [objectName]: value } };
    handleProjectSave(newAnswer)
  };

  const handleLocation = (lat, lng) => {
    const newAnswer = {
      ...hotspotData,
      latitude: lat,
      longitude: lng
    };
    handleProjectSave(newAnswer);
  }

  const handleColor = (color) => {
    const newAnswer = {
      ...hotspotData,
      pin_color: color
    };
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
          currentMarkerColor={hotspotData.pin_color || "add8e6"}
          handleColor={handleColor}
        />

        <div className="pure-control-group required">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number" id="latitude" placeholder="enter latitude" min={-90} max={90} step={LongLatStep}
            value={hotspotData.latitude != null ? hotspotData.latitude : ""}
            onChange={e => handleChange("latitude", e.target.value)}
          />
        </div>

        <div className="pure-control-group required">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number" id="longitude" placeholder="enter longitude" min={-180} max={80} step={LongLatStep}
            value={hotspotData.longitude != null ? hotspotData.longitude : ""}
            onChange={e => handleChange("longitude", e.target.value)}
          />
        </div>

        {currentPano &&
          <>
            <h3>Preview:</h3>
            <Canvas id="canvas" camera={{ position: [0, 0, 1], fov: 45 }}>
              <Suspense fallback={<Html center><p>Loading...</p></Html>}>
                < CubeMapVR data={{ panorama_image: currentPano ? currentPano : "", overlay: currentOverlay ? currentOverlay : "" }} tourBasePath={""} />
              </Suspense>
            </Canvas>
          </>
        }

        <div className="pure-control-group">
          <label htmlFor="overlay">Overlay image</label>
          <input
            type="file" id="overlay" placeholder="select image" accept="image/*"
            onChange={e => {
              const fileBlob = URL.createObjectURL(e.target.files[0]);
              changeHotspotImage(parseInt(id), "overlay", fileBlob);
              setOverlay(fileBlob);
              handleChange("overlay", e.target.files[0]['name'])
            }}
          />

        </div>


        <div className="pure-control-group">
          <label htmlFor="panorama-img">Panorama image</label>
          <input
            type="file" id="panorama-img" placeholder="select image" accept="image/*"
            onChange={e => {
              const fileBlob = URL.createObjectURL(e.target.files[0]);
              changeHotspotImage(parseInt(id), "panorama_image", fileBlob);
              setPano(fileBlob);
              handleChange("panorama_image", e.target.files[0]['name'])
            }}
          />

        </div>


        <div className="pure-control-group">
          <label htmlFor="virtual-object">3D Object</label>
          <input
            type="file" id="virtual-object" placeholder="select object" accept=".glb"
            onChange={e => {
              const fileBlob = URL.createObjectURL(e.target.files[0]);
              changeHotspotImage(parseInt(id), "virtual_object", fileBlob);
              setOverlay(fileBlob);
              handleChange("virtual_object", e.target.files[0]['name'])
            }}
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