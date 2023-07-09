import Map from "mapmyindia-react";
import { useEffect, useState } from "react";

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

import { getDatabase, ref, set, onValue } from "firebase/database";
import { database } from "../firebase";

const Mappage = () => {
	const [location, setLocation] = useState({});

    const [markerData, setMarkerData] = useState([
        {
          position: [18.47242418848995, 73.91155514743757],
          draggable: true,
          title: "emp1",
          onClick: (e) => {
            console.log("clicked");
          },
        },
      ]);



	const fetchdata = async () => {
		const starCountRef = ref(database, "locations/3");
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			setLocation(data);
			console.log(data);
		});
	};

	useEffect(() => {
		let intervalId = null;
		intervalId = setInterval(fetchdata, 30000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);


    const addMarker = (latitude, longitude) => {
        const newMarker = {
          position: [location.latitude, location.longitude],
          draggable: true,
          title: `emp${markerData.length + 1}`,
          onClick: (e) => {
            console.log("clicked");
          },
        };

        setMarkerData([...markerData, newMarker]);
    };
	// useEffect(() => {
	//     socket.on("receiveLocation", (receivedLocation) => {
	//         setLocation(receivedLocation);
	//         console.log("receivedLocation" + receivedLocation);
	//     });
	// }, [socket])

	return (
		<div>
			<h1>Map</h1>
			<Map
				markers={markerData}
			/>
		</div>
	);
};

export default Mappage;
