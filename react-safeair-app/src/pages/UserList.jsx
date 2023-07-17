import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Map from "mapmyindia-react";
import logo from "../assets/safeair.png";

import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
} from "@material-tailwind/react";

import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [userData, setUserData] = useState("");
	const [userNames, setUserNames] = useState([]);
	const navigate = useNavigate();
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [userEmail, setUserEmail] = useState("");

	useEffect(() => {
		let intervalId = null;
		intervalId = setInterval(() => {
			const db = getDatabase();
			const starCountRef = ref(db, "locations/");
			onValue(starCountRef, (snapshot) => {
				const data = snapshot.val();
				console.log(Object.keys(data));
				setUsers(Object.keys(data));
				setUserData(data);
			});
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const changeMap = (user) => {
		
				setLat(userData[user].latitude);
				setLng(userData[user].longitude);
				setUserEmail(userData[user].email);
		
	};

	return (
		<div>
			{/* <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
				<div className="mb-2 p-4">
					<Typography variant="h5" color="blue-gray">
						Sidebar
					</Typography>
				</div>
				<ul>
					{users.map((user , index) => (
                        <Link to='/map'
                        state={{ user: user }}
                        >
                            <li  key={index}>{user}</li>
                        </Link>
					))}
					
				</ul>
			</Card> */}
			<div className="flex">
				<aside class="flex flex-col w-1/4 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
					<a href="#">
						<img class="w-auto h-20" src={logo} alt="" />
					</a>

					<div class="flex flex-col justify-between flex-1 mt-6">
						<nav class="flex-1 -mx-3 space-y-5 mt-16 ">
							{users.map((user, index) => (
								<Link
									class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
									onClick={() => {
										changeMap(user);
									}}
								>
									<span class="mx-2 text-sm font-medium" key={index}>
										{userData[user].email}
									</span>

                                    <button className=" md:block p-3 px-5 pt-2 text-black bg-red-300 rounded-full baseline hover:bg-brightRedLight">Update</button>
								</Link>
							))}
						</nav>

						<div class="mt-6">
							<div class="flex items-center justify-between mt-6">
								<a href="#" class="flex items-center gap-x-2">
									<img
										class="object-cover rounded-full h-7 w-7"
										src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80"
										alt="avatar"
									/>
									<span class="text-sm font-medium text-gray-700 dark:text-gray-200">
										Safe Air
									</span>
								</a>

								<a
									href="#"
									class="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</aside>
				<div className=" w-3/4">
					<h1>Map</h1>
					<Map
						height="91vh"
						zoom={16}
						markers={[
							{
								position: [lat, lng],
								title: userEmail,
								onClick: (e) => {
									console.log("clicked ");
								},
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
};

UserList.propTypes = {};

export default UserList;
