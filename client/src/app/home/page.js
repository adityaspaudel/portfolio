"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const WelcomeHome = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		age: "",
		textMessage: "",
	});

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
			alert("Message sent successfully!");
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
			alert("Failed to send message. Please try again.");
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
					className="text-black p-2 hover:bg-green-200 hover:rounded-tr-xl cursor-pointer">
					<FaGithub />
				</a>
				<a
					href="https://www.linkedin.com/in/adityaspaudel/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 p-2 hover:bg-green-200 cursor-pointer">
					<FaLinkedin />
				</a>
				<a
					href="https://x.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 p-2 hover:bg-green-200 cursor-pointer">
					<FaTwitter />
				</a>

				<a
					href="https://www.instagram.com/adityas.paudel/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-red-600 p-2 hover:bg-green-200 hover:rounded-br-xl cursor-pointer">
					<FaInstagram />
				</a>
			</div>

			{/* Avatar and Menubar ------------------------------------------------*/}
			<div className="flex justify-between bg-blue-50 p-2 uppercase text-black">
				<div className="flex gap-4 font-bold justify-center items-center cursor-pointer">
					<Image
						className="h-[50px] w-[50px] rounded-3xl"
						src="/avatar-aaditya.jpg"
						height={50}
						width={50}
						alt="avatar-aaditya"
					/>
					<div>Aaditya Paudel</div>
				</div>
				<div className="flex gap-20 bg-blue-50 mt-0 justify-center items-center fixed top-0 right-0">
					<div className="p-5 hover:bg-blue-200 cursor-pointer">Home</div>
					<div className="p-5 hover:bg-blue-200 cursor-pointer">About</div>
					<div className="p-5 hover:bg-blue-200 cursor-pointer">Projects</div>
					<div className="p-5 hover:bg-blue-200 cursor-pointer">Contact</div>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-4 justify-center items-center">
				<div className="text-6xl font-bold uppercase">
					👋 Hi there, I'm Aaditya Paudel
				</div>

				{/* About Me ---------------------------------------------------*/}
				<div className="flex flex-col justify-center items-center">
					<h1 className="uppercase font-bold text-3xl">About me</h1>
					<hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
					<div className="flex justify-between gap-[100px]">
						<div>
							<div className="uppercase font-bold text-2xl ">Education</div>
							<div className="w-[400px] list-none">
								<div className="flex flex-col gap-4 w-[400px] list-none  m-auto">
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										🎓 Hi Im Bachelor degree graduate in BCA (Bachelor in
										Computer Application), from Oxford College of Engineering
										and Management, Gaindakot-2 Nawalparasi
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										🥰 I'm a passionate web developer specializing in modern
										JavaScript with Reactjs, Nextjs, and Nodejs with Expressjs
										and Responsive Web Design.
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										🌱 I’m actively learning MERN Stack at BroadwayInfosys and
										self-teaching myself with online documentation like
										w3Schools, MDN web docs, and freeCodeCamp,GeekForGeeks, and
										Youtube Playlists of YahooBaba (HTML+CSS+JavaScript), Thapa
										Technical (React+ Mongoose+ mongodb) .
									</li>
								</div>
							</div>
						</div>

						{/* Skills--------------------------------------------------------- */}
						<div className="w-[400px] bg-blue-100 p-2 rounded-md">
							<h1 className="uppercase font-bold text-2xl">My skills</h1>
							<div className="flex gap-2 list-none uppercase text-sm">
								<div className="flex flex-col gap-2">
									<h2 className="font-bold text-lg">My tech stack</h2>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										reactjs, nextjs
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										javascript and modern javascript
									</li>

									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										redux, redux toolkit, react-redux, redux-persist,
										redux-logger
									</li>

									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										css
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										tailwind css, tailwind-merge
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										html and html5
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										formik and yup
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										shadcn, lucide-react, chartjs, nextui, radixui
									</li>
								</div>
								<div className="flex flex-col gap-2">
									<h1 className="font-bold text-lg">Backend</h1>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										Nodejs
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										Expressjs
									</li>

									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										Mongodb
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										mongoose
									</li>

									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										restful api
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										axios
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										GraphQL
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										websocket
									</li>
								</div>
								<div className="flex flex-col gap-2">
									<h1 className="font-bold text-lg">
										Other tools and libraries
									</h1>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										vscode
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										npm
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										git and github
									</li>

									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										postman
									</li>

									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										react-toastify, moment, framer-motion, react-pdf/renderer,
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										cmdk, clsx, tiptap-react
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										bcypt and jwt
									</li>

									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										nodemon
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										cors
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										nodemailer
									</li>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Form ------------------------------------------------------ */}
				<div className="border-2 hover:border-black p-4 rounded-xl">
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
								className="border-2 p-2"
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
								className="border-2 p-2"
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
								className="border-2 p-2"
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
								className="border-2 p-2"
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
			</div>
		</div>
	);
};

export default WelcomeHome;
