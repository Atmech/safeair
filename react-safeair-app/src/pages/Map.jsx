import React, { useEffect, useState, useRef } from "react";
// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { MapContainer, TileLayer, useMap, Popup, Marker, useMapEvents,  } from "react-leaflet";
import L  from "leaflet";
import markerLogo from "../assets/location.png";
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl;

	L.Icon.Default.mergeOptions({
		iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
		iconUrl: require("leaflet/dist/images/marker-icon.png"),
		shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
	});


function Map() {
  const [position, setPosition] = useState([18.47242418848995, 73.91155514743757]);
	const mapRef = useRef();
    
  const handleClick = () => {
    const { current = {}} = mapRef;
		const { leafletElement: map } = current;
		map.setView([18.925103, 72.832404], 16);
  }
    return (
      <>
      <button onClick={handleClick}>got to </button>
       <MapContainer
						center={position}
						zoom={20}
						ref={mapRef}
						scrollWheelZoom={true}
						style={{ height: "100vh", width: "100%" }}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={position}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</MapContainer>
      </>
    );
}

export default Map