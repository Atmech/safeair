import Mappage from "./pages/Mappage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDatabase, ref, set } from "firebase/database";

import { database } from "./firebase";

import io from "socket.io-client";
const socket = io.connect("http://192.168.1.4:3001");

function App() {
	const [lacation, setLocation] = useState([]);
	const [isTracking, setIsTracking] = useState(false);

		// Function to fetch the device's location and store it in Firebase
		const fetchAndStoreLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						// Get the latitude and longitude
						const { latitude, longitude } = position.coords;
						// Store the location in Firebase
            const locationData = { latitude, longitude };

						socket.emit("sendLocation", {
              latitude: 'dksjhf',
              longitude:  'asjkhdgj',
            });
						// await set(ref(database, "locations/3"), {
						// 	latitude,
						// 	longitude,
						// 	timestamp: Date(),
						// });
					},
					(error) => {
						console.error("Error retrieving location:", error);
					}
				);
				console.log("fetchAndStoreLocation");
			} else {
				console.error("Geolocation is not supported by this browser.");
			}
		};
    
    const handleStartStop = () => {
      setIsTracking((prevIsTracking) => !prevIsTracking);
    };

  
    useEffect(() => {
      let intervalId = null;
  
      if (isTracking) {
        intervalId = setInterval(fetchAndStoreLocation, 10000);
      } else {
        clearInterval(intervalId);
      }
  
      return () => {
        clearInterval(intervalId);
      };
    }, [isTracking]);

    useEffect(() => {
      socket.on("location", (location) => {
          console.log("message = " + location.latitude);

      });
  }, [socket])
      

	return (
		<div className="App">
			<h1>Home</h1>
			<a href="/map">Go to Map</a>
      <button onClick={handleStartStop}>{isTracking ? 'Stop' : 'Start'}</button>
			<Routes>
				{/* <Route path="map" element={<Mappage />} /> */}
			</Routes>
		</div>
	);
}

export default App;
