"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";
const WelcomeHome = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		age: "",
		textMessage: "",
	});
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("http://localhost:9000/getData"); // Fetch from your API endpoint
				if (!res.ok) {
					const errorData = await res.json(); // Try to parse error response
					alert(JSON.stringify(errorData));
					throw new Error(
						`${res.status} ${res.statusText}: ${
							errorData?.error || "Failed to fetch data"
						}`
					); // More informative error
				}

				const jsonData = await res.json();
				console.log(JSON.stringify(jsonData));
				setData(jsonData);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err.message); // Set the error message for display
			}
		};

		fetchData();
	}, []);

	// if (loading) {
	// 	return <div className="flex justify-center items-center">loading...</div>;
	// }

	// if (error) {
	// 	return <div>Error: {error}</div>;
	// }

	const text1 = "  👋 Hello there, I'm Aaditya Paudel"; // The text to type out
	const [displayedText, setDisplayedText] = useState(""); // State for the text being displayed

	useEffect(() => {
		let currentIndex = 0;

		const interval = setInterval(() => {
			if (currentIndex < text1.length - 1) {
				setDisplayedText((prevText) => prevText + text1[currentIndex]);
				currentIndex = currentIndex + 1;
			} else {
				clearInterval(interval); // Stop the interval when typing is done
			}
		}, 100);
		//speen in millisecond

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, [text1]);
	//----------------------------------------------------------
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission
		try {
			const response = await axios.post(
				"http://localhost:9000/sendMessage",
				formData
			);

			// success message----------------------------
			// alert("Message sent successfully!");
			toast.success("MESSAGE SENT successfully!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			console.log("Response:", response.data);
			// Reset the form------------------------
			setFormData({
				fullName: "",
				email: "",
				age: "",
				textMessage: "",
			});
		} catch (error) {
			console.error("Error sending message:", error);
			toast.error(`Error submitting form: ${error.message}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	return (
		<div className="font-mono">
			{/* Social Media Sidebar------------------------------------------------ */}
			<div
				className="flex flex-col font-mono  bg-blue-100 text-5xl hover:bg-blue-50 border-2 hover:border-black fixed top-1/2 transform -translate-y-1/2
        rounded-tr-xl rounded-br-xl gap-4">
				<a
					href="https://github.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className="text-black p-2 hover:bg-green-200 hover:rounded-tr-xl cursor-pointer transition-transform duration-300 hover:scale-110  px-4 py-2">
					<FaGithub />
				</a>
				<a
					href="https://www.linkedin.com/in/adityaspaudel/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 p-2 hover:bg-green-200 cursor-pointer transition-transform duration-300 hover:scale-110  px-4 py-2">
					<FaLinkedin />
				</a>
				<a
					href="https://x.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 p-2 hover:bg-green-200 cursor-pointer transition-transform duration-300 hover:scale-110  px-4 py-2">
					<FaTwitter />
				</a>

				<a
					href="https://www.instagram.com/adityas.paudel/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-red-600 p-2 hover:bg-green-200 hover:rounded-br-xl cursor-pointer transition-transform duration-300 hover:scale-110  px-4 py-2">
					<FaInstagram />
				</a>
			</div>

			{/* Avatar and Menubar ------------------------------------------------*/}
			<div className="flex justify-between items-center mt-0 bg-blue-50 uppercase text-black">
				<div className="flex gap-2 sticky top-0 left-0 bg-slate-200  font-bold justify-center items-center cursor-pointer">
					<Image
						className="h-[100px] w-[100px] rounded-3xl p-2 "
						src="/avatar-aaditya.jpg"
						height={100}
						width={100}
						alt="avatar-aaditya"
					/>
					<div className="text-2xl">Aaditya Paudel</div>
				</div>
				<div className="flex gap-20  justify-start items-start sticky mt-0 top-0 right-0">
					<div className="p-10 hover:bg-blue-200 text-xl cursor-pointer">
						Home
					</div>
					<div className="p-10 hover:bg-blue-200 text-xl cursor-pointer">
						About
					</div>
					<div className="p-10 hover:bg-blue-200 text-xl cursor-pointer">
						Projects
					</div>
					<div className="p-10 hover:bg-blue-200 text-xl cursor-pointer">
						Contact
					</div>
				</div>
			</div>

			{/* Content---------------------------- */}
			<div className="flex flex-col  gap-4 justify-center items-center">
				<div className="text-6xl font-bold uppercase animate inline-block transition-transform duration-300 hover:scale-110 bg-blue-500 text-white px-4 py-2 rounded">
					{displayedText}
				</div>

				{/* About Me ---------------------------------------------------*/}
				<div className="flex flex-col w-[80%] justify-center items-center">
					{/* <h1 className="uppercase font-bold text-3xl">About me</h1> */}
					{/* <hr className=" border-black border-2 w-full" />
					<hr className="w-40 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" /> */}
					<div className="flex justify-between items-center gap-10]">
						<div className="flex gap-2 flex-col  justify-center items-center">
							<h1 className="uppercase font-bold text-2xl p-2 ">Education</h1>
							<hr className=" border-black border-2 w-full" />{" "}
							<div className=" list-none p-2">
								<div className="flex gap-4  list-none p-2  m-auto">
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2 ">
										🎓 Hi Im Bachelor degree graduate in BCA (Bachelor in
										Computer Application), from Oxford College of Engineering
										and Management, Gaindakot-2 Nawalparasi
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										🥰 I'm a passionate web developer specializing in modern
										JavaScript with Reactjs, Nextjs, and Nodejs with Expressjs
										and Responsive Web Design.
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										🌱 I’m actively learning MERN Stack at BroadwayInfosys and
										self-teaching myself with online documentation like
										w3Schools, MDN web docs, and freeCodeCamp,GeekForGeeks, and
										Youtube Playlists of YahooBaba (HTML+CSS+JavaScript), Thapa
										Technical (React+ Mongoose+ mongodb) .
									</li>
								</div>
							</div>
						</div>
					</div>

					{/* Skills--------------------------------------------------------- */}
					<div className="flex gap-10 w-full  justify-between items-center p-2 rounded-md bg-blue-50">
						<div className="flex gap-10 flex-col list-none capitalize text-sm justify-center  w-full items-center">
							<div className="flex justify-center  items-center gap-2 w-full">
								<div className="flex gap-2 w-full flex-col jsutify-center items-center uppercase font-bold text-2xl  ">
									<h1>My skills</h1>
									<hr className="border-2 border-black w-full" />
								</div>
							</div>
							{/* here ----------------------------*/}
							<div className="flex gap-10 ">
								<div className="flex flex-col gap-2 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
									<h2 className="font-bold uppercase text-lg ">
										Frontend Technologies
									</h2>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											reactjs
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											reactjs
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										javascript (ES6+)
									</li>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											redux toolkit
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											react-redux
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											redux-persist
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											redux-logger
										</li>
									</div>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											css
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											tailwind css
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											tailwind-merge
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										html and html5
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										formik and yup
									</li>
								</div>
								<div className="flex flex-col gap-2 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
									<h1 className="font-bold uppercase text-lg">
										Backend Technologies
									</h1>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											Nodejs
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											Expressjs
										</li>
									</div>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											Mongodb
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											mongoose
										</li>
									</div>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											RESTful api
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											axios
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										GraphQL
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										websocket
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										Server Sent Events (SSE)
									</li>
								</div>
								<div className="flex flex-col gap-2 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
									<h1 className="font-bold uppercase text-lg">
										Other tools and libraries
									</h1>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										vscode
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										npm
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										git and github
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										postman
									</li>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											react-toastify
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											moment
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											framer-motion
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											react-pdf/renderer
										</li>
									</div>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											cmdk
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											clsx
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											tiptap-react
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
										bcypt and json web token (JWT)
									</li>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											nodemon
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											cors
										</li>{" "}
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											dotenv
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											nodemailer
										</li>
									</div>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											shadcn
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											lucide-react,
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											nextui
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											radixui
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md transition-transform duration-300 hover:scale-110  px-4 py-2">
											chartjs
										</li>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Form ------------------------------------------------------ */}
				<div className="flex gap-10">
					<div className="border-2 hover:border-black p-8 rounded-xl transition-transform duration-300 hover:scale-110  px-4 py-2 ">
						<h2 className="bg-blue-200 p-2">Message me</h2>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-2 w-[400px]">
							<div className="flex flex-col">
								<label
									className="p-2"
									htmlFor="fullName">
									Full Name
								</label>
								<input
									className="border-2 border-gray-600 p-2 transition-transform duration-300 hover:scale-110  px-4 py-2"
									name="fullName"
									placeholder="Enter your full name"
									type="text"
									value={formData.fullName}
									onChange={handleChange}
									onFocus={(e) => (e.target.style.color = "#0b7f05")} // Focus style
									onBlur={(e) => (e.target.style.color = "#898686")} // Unfocus style
								/>
							</div>
							<div className="flex flex-col">
								<label
									className="p-2"
									htmlFor="email">
									Email
								</label>
								<input
									className="border-2 border-gray-600 p-2 transition-transform duration-300 hover:scale-110  px-4 py-2"
									name="email"
									type="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={handleChange}
									onFocus={(e) => (e.target.style.color = "#0b7f05")} // Focus style
									onBlur={(e) => (e.target.style.color = "#898686")} // Unfocus style
								/>
							</div>
							<div className="flex flex-col">
								<label
									className="p-2"
									htmlFor="age">
									Age
								</label>
								<input
									className="border-2 border-gray-600 p-2 transition-transform duration-300 hover:scale-110  px-4 py-2"
									name="age"
									type="age"
									placeholder="Enter your age"
									value={formData.age}
									onChange={handleChange}
									onFocus={(e) => (e.target.style.color = "#0b7f05")} // Focus style
									onBlur={(e) => (e.target.style.color = "#898686")} // Unfocus style
								/>
							</div>
							<div className="flex flex-col">
								<label
									className="p-2"
									htmlFor="textMessage">
									Message
								</label>
								<textarea
									className="border-2 border-gray-600 p-2 transition-transform duration-300 hover:scale-110  px-4 py-2"
									name="textMessage"
									placeholder="Enter Message"
									value={formData.textMessage}
									onChange={handleChange}
									onFocus={(e) => (e.target.style.color = "#0b7f05")} // Focus style
									onBlur={(e) => (e.target.style.color = "#898686")} // Unfocus style
								/>
							</div>
							<div className="flex justify-center items-center">
								<button
									className={cn(
										"px-4 py-2 rounded-md border border-transparent",
										"bg-red-500 text-white font-semibold shadow-md",
										"hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400",
										"active:bg-green-600 transition-colors duration-300",
										"w-[100%]"
									)}
									type="submit">
									Submit
								</button>
							</div>
						</form>
					</div>
					{/* message received ------------------------------------------*/}
					<div>
						<h1 className="font-bold sentencecase">
							previous message received
						</h1>
						<div>
							{data.map((item) => (
								<li
									className="none"
									key={item._id}>
									{/* Important: Use _id as the key */}
									<span className="text-pink-800">{item.fullName}</span>:
									{/* <span className=" animate-ping">{item.textMessage}</span> */}
									<span className=" ">{item.textMessage}</span>
								</li>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WelcomeHome;
