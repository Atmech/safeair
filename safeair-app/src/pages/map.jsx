import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";

export function ChangeView({ coords }) {
	const map = useMap();
	map.setView(coords, 20);
	return null;
}

const map = () => {
	const [geoData, setGeoData] = useState({ lat: 18.47260293282831, lng: 73.91173789340012 }); //  18.47260293282831, 73.91173789340012

	const center = [geoData.lat, geoData.lng];

	return (
		<>
			<MapContainer center={center} zoom={20} style={{ height: "100vh" }}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{geoData.lat && geoData.lng && (
					<Marker position={[geoData.lat, geoData.lng]} />
				)}
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
				<ChangeView coords={center} />
			</MapContainer>
		</>
	);
};

export default map;
