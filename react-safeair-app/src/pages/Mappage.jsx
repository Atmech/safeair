import Map from "mapmyindia-react";
import { useEffect, useState, useRef } from "react";

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { set } from "lodash";
import {uselocationCords} from 'react-router-dom';

import {useLocation} from 'react-router-dom';





const markers = [
	{
		position: [18.47242418848995, 73.91155514743757],
		title: "emp1",
		onClick: (e) => {
			console.log("clicked ");
		},
	},
];

var lat = 0;
var lng = 0;

const Mappage = () => {

	
	const location = useLocation();



	// console.log("State === ", state);

	const [locationCords, setlocationCords] = useState({});
	const latitude = useRef("");
	const longitude = useRef("");

	// const fetchdata = async () => {
	// 	const starCountRef = ref(database, "locationCordss");
	// 	onValue(starCountRef, async (snapshot) => {
	// 		const data = await snapshot.val();
	// 		console.log(data);
	// 		setlocationCords(data);
	// 		console.log(locationCords);
	// 		return data;
	// 	});
	// };

	// const updatelocationCords = async (data) => {
	// 	setlocationCords([
	// 		JSON.stringify(data[0].latitude),
	// 		JSON.stringify(data[0].longitude),
	// 	]);
		// console.log(locationCords);
	// 	// latitude.current = JSON.stringify(data.latitude);
	// 	// longitude.current = JSON.stringify(data.longitude);

	// 	// mapp through all the elenents in data  add them to markers

	// 	// const loc = data.map((item) => {
	// 	// 	lat = parseFloat(item.latitude);
	// 	// 	lng = parseFloat(item.longitude);
	// 	// 	// addMarker(lat, lng);
	// 	// })

	// 	// for (let i = 0; i < data.length; i++) {
	// 	// 	lat = parseFloat(data[i].latitude);
	// 	// 	lng = parseFloat(data[i].longitude);

	// 	// 	// addMarker(lat, lng);
	// 	// 	console.log(markers);
	// 	// }
	// };

	useEffect(() => {
		const db = getDatabase();
		console.log(location);
		const starCountRef = ref(db, "locations/" + location.state.user );
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			setlocationCords(data);
			console.log(data);
			console.log(locationCords);

		});
	}, []);

	// useEffect(() => {
	// 	let intervalId = null;
	// 	intervalId = setInterval(fetchdata, 2000);
	// 	return () => {
	// 		clearInterval(intervalId);
	// 	};
	// }, []);

	// const addMarker = (lat, lng) => {
	// 	markers.push({
	// 		position: [lat, lng],
	// 		title: "emp2",
	// 		onClick: (e) => {
	// 			console.log("clicked ");
	// 		},
	// 	});
	// };

	// useEffect(() => {
	//     socket.on("receivelocationCords", (receivedlocationCords) => {
	//         setlocationCords(receivedlocationCords);
	//         console.log("receivedlocationCords" + receivedlocationCords);
	//     });
	// }, [socket])

	return (
		<div>
			<h1>Map</h1>
			<Map height="91vh" width="100vw" zoom={16}
				markers={[
					{
						position: [locationCords.latitude, locationCords.longitude],
						title: locationCords.name,
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
