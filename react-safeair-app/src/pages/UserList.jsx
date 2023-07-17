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
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [userData, setUserData] = useState("");
	const [userNames, setUserNames] = useState([]);
	const navigate = useNavigate();
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [userEmail, setUserEmail] = useState("");

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				// ...
			} else {
				// User is signed out
				navigate("/");
				// ...
			}
		});
	}, []);

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

	const search = () => {
		if (document.getElementById("searchbar") == null) {
			return;
		} else {
			let input = document.getElementById("searchbar").value;
			input = input.toLowerCase();
			let x = document.getElementsByClassName("listItem");

			for (let i = 0; i < x.length; i++) {
				if (!x[i].innerHTML.toLowerCase().includes(input)) {
					x[i].style.display = "none";
				} else {
					x[i].style.display = "list-item";
				}
			}
		}
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
				<aside class="flex flex-col w-1/4 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
					<a href="#">
						<img class="w-auto h-20 " src={logo} alt="" />
					</a>

					<div class="flex flex-col justify-between flex-1 mt-6">
						<nav class="flex-1 -mx-3 space-y-5 mt-16 ">
							<div class="relative mx-3">
								<span class="absolute inset-y-0 left-0 flex items-center pl-3">
									<svg
										class="w-5 h-5 text-gray-400"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>
								</span>

								<input
									type="text"
									id="searchbar"
									onkeyup={search()}
									name="search"
									placeholder="Search..."
									class="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
								/>
							</div>
							<div id="list">
								{users.map((user, index) => (
									<Link
										class="listItem flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
										onClick={() => {
											changeMap(user);
										}}
									>
										<span
											class="mx-2 text-sm font-medium"
											key={index}
										>
											{userData[user].email}
										</span>

										<button className=" md:block p-1 px-2 pt-1 text-black text-sm bg-gray-300 rounded-full baseline hover:bg-brightRedLight">
											Update
										</button>
									</Link>
								))}
							</div>
						</nav>

						<div class="mt-6">
							<div class="flex items-center justify-between mt-6">
								<a href="#" class="flex items-center gap-x-2">
									<img
										className="object-cover rounded-full h-7 w-7 profile__pic mr-2"
										src={
											auth.currentUser?.photoURL != null
												? auth.currentUser?.photoURL
												: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_F8Fkc4WqCZ018z4t2RSPmA9iTAdeEaopA&usqp=CAU"
										}
										alt="avatar"
									/>
									<span class="text-sm font-medium text-white dark:text-gray-200">
										Safe Air
									</span>
								</a>

								<a
									href="#"
									onClick={() => auth.signOut()}
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
					<Map
						height="100vh"
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
