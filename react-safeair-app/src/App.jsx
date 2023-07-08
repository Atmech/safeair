import Mappage from "./pages/Mappage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDatabase, ref, set } from "firebase/database";

import { database } from "./firebase";

function App() {
	const [lacation, setLocation] = useState([]);

	useEffect(() => {
		// Function to fetch the device's location and store it in Firebase
		const fetchAndStoreLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						// Get the latitude and longitude
						const { latitude, longitude } = position.coords;
						// Store the location in Firebase
						await set(ref(database, "locations/3"), {
							latitude,
							longitude,
							timestamp: Date(),
						});
					},
					(error) => {
						console.error("Error retrieving location:", error);
					}
				);
			} else {
				console.error("Geolocation is not supported by this browser.");
			}
		};

		// Fetch and store the location every 5 minutes
		const interval = setInterval(fetchAndStoreLocation, 1000);

		// Clean up the interval when the component is unmounted
		return () => clearInterval(interval);
	}, []);

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			console.log("Geolocation not supported");
		}

		function success(position) {
			const latitude = position.coords.latitude;
			setLocation(position.coords.latitude);
			const longitude = position.coords.longitude;
			setLocation(position.coords.longitude);
			console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
			console.log(lacation);
		}

		function error() {
			console.log("Unable to retrieve your location");
		}
	}
	return (
		<div className="App">
			<h1>Home</h1>
			<a href="/map">Go to Map</a>
			<button onClick={getLocation}>Sharre my location</button>
			<Routes>
				<Route path="map" element={<Mappage />} />
			</Routes>
		</div>
	);
}

export default App;
