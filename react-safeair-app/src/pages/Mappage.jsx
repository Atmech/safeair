import Map from "mapmyindia-react";
import { useEffect, useState, useRef } from "react";

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { set } from "lodash";

const markers = [
	{
		position: [18.47242418848995, 73.91155514743757],
		draggable: true,
		title: "emp1",
		onClick: (e) => {
			console.log("clicked ");
		},
	},
];

var lat = 0;
var lng = 0;

const Mappage = () => {
	const [location, setLocation] = useState([]);
	const latitude = useRef("");
	const longitude = useRef("");

	const fetchdata = async () => {
		const starCountRef = ref(database, "locations/3");
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			updateLocation(data);
		});
	};

	const updateLocation = async (data) => {
		setLocation([
			JSON.stringify(data.latitude),
			JSON.stringify(data.longitude),
		]);
		latitude.current = JSON.stringify(data.latitude);
		longitude.current = JSON.stringify(data.longitude);
		lat = parseFloat(data.latitude);
		lng = parseFloat(data.longitude);
		console.log("lat" + lat);
		console.log("lng" + lng);
	};

	useEffect(() => {
		let intervalId = null;
		intervalId = setInterval(fetchdata, 30000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const addMarker = () => {
		markers.push({
			position: [lat, lng],
			draggable: true,
			title: "emp2",
			onClick: (e) => {
				console.log("clicked ");
			},
		});
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
				markers={[
					{
						position: [lat, lng],
						draggable: true,
						title: "emp1",
						onClick: (e) => {
							console.log("clicked ");
						},
					},
				]}
			/>
		</div>
	);
};

export default Mappage;
