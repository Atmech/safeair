import React, { useEffect, useState } from "react";
import logo from "../assets/safeair.png";
import location from "../assets/location.png";

import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { initializeApp } from 'firebase-admin/app';

// const app = initializeApp();



  

function Employees() {

    // useEffect(() => {
    //     listAllUsers();
    // }, []);


    // const listAllUsers = (nextPageToken) => {
    //     // List batch of users, 1000 at a time.
    //     getAuth()
    //       .listUsers(1000, nextPageToken)
    //       .then((listUsersResult) => {
    //         listUsersResult.users.forEach((userRecord) => {
    //           console.log('user', userRecord.toJSON());
    //         });
    //         if (listUsersResult.pageToken) {
    //           // List next batch of users.
    //           listAllUsers(listUsersResult.pageToken);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log('Error listing users:', error);
    //       });
    //   };

      return (
		<div>
			<main>
				<div className=" flex">
					<aside class="flex flex-col w-1/4 h-screen px-5 py-8 overflow-y-auto bg-black border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
						<a href="#">
							<img class="w-auto h-20 " src={logo} alt="" />
						</a>

						<div class="flex flex-col justify-between flex-1 mt-6">
							<nav class="flex-1 -mx-3 space-y-5 mt-16 ">
								<div id="list">
									<Link
										to={"/employees"}
										className="listItem flex  px-7 py-5 text-black bg-gray-100 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
									>
										<span className="mx-2 text-lg font-medium">
											View Employees
										</span>
									</Link>
									<Link
										to={"/createemployee"}
										className="listItem flex  px-7 py-5 text-white bg-gray-700 my-5 mx-5 transition-colors duration-300 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
									>
										<span className="mx-2 text-lg font-medium">
											Add Employees
										</span>
									</Link>
								</div>
							</nav>
							<div class=" flex flex-col fixed bottom-0 left-0 pl-7 py-7 bg-black w-1/4 ">
								<div>
									<Link
										to="/userlist"
										class="flex items-center gap-x-2"
									>
										<img src={location} alt="" className=" h-7" />
										<span class="font-medium text-lg text-white dark:text-gray-200">
											Back to Track Employees
										</span>
									</Link>
								</div>
								<div class="flex items-center justify-between mt-6 pr-5">
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
					<div className=" w-3/4 ">
						<div class="relative overflow-x-auto px-32 mt-32">
                            <h1 className=" text-center text-2xl font-bold my-10">All Employees</h1>
							<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" class="px-6 py-3">
											Product name
										</th>
										<th scope="col" class="px-6 py-3">
											Color
										</th>
										<th scope="col" class="px-6 py-3">
											Category
										</th>
										<th scope="col" class="px-6 py-3">
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											Apple MacBook Pro 17"
										</th>
										<td class="px-6 py-4">Silver</td>
										<td class="px-6 py-4">Laptop</td>
										<td class="px-6 py-4">$2999</td>
									</tr>
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											Microsoft Surface Pro
										</th>
										<td class="px-6 py-4">White</td>
										<td class="px-6 py-4">Laptop PC</td>
										<td class="px-6 py-4">$1999</td>
									</tr>
									<tr class="bg-white dark:bg-gray-800">
										<th
											scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											Magic Mouse 2
										</th>
										<td class="px-6 py-4">Black</td>
										<td class="px-6 py-4">Accessories</td>
										<td class="px-6 py-4">$99</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Employees;
