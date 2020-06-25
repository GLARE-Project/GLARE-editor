import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapField = ({ handleLocation, currentLatitude, currentLongitude }) => {

  const mapRef = useRef(null);

  const [position, setPosition] = useState([currentLatitude, currentLongitude]);
  const [zoom, setZoom] = useState(2);

  const zoomLocation = useCallback((latlong) => {
    mapRef.current.leafletElement.flyTo(latlong, zoom, {animate: true});
  }, [zoom]);

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    
    setPosition([currentLatitude, currentLongitude]);
    zoomLocation({lat: currentLatitude, lng: currentLongitude});

  }, [currentLatitude, currentLongitude, zoomLocation]);

  const changeLocation = (e) => {
    const {lat, lng} = e.latlng;
    setZoom(10);
    handleLocation(lat, lng);
  }

  return (
    <React.Fragment>
      <LeafletMap 
        style={{height: '20em'}}
        center={position} zoom={zoom}
        onClick={changeLocation}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {position[0] !== 0 && position[1] !== 0 &&
        <Marker position={position}>
          <Popup>
            <span>selected location</span>
          </Popup>
        </Marker>
        }
      </LeafletMap>
    </React.Fragment>
  )
};

export default MapField;