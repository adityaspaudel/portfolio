"use client";

import React, { useState } from "react";
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
				<div className="flex flex-col justify-between items-center">
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
						<div className="w-auto p-2 rounded-md bg-blue-50">
							<h1 className="uppercase font-bold text-2xl">My skills</h1>
							<div className="flex gap-2 list-none capitalize text-sm">
								<div className="flex flex-col gap-2 border-2 hover:border-black p-2 rounded-md">
									<h2 className="font-bold uppercase text-lg ">
										Frontend Technologies
									</h2>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											reactjs
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											reactjs
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										javascript (ES6+)
									</li>

									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											redux toolkit
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											react-redux
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											redux-persist
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											redux-logger
										</li>
									</div>

									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											css
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											tailwind css
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											tailwind-merge
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										html and html5
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										formik and yup
									</li>
								</div>
								<div className="flex flex-col gap-2 border-2 hover:border-black p-2 rounded-md">
									<h1 className="font-bold uppercase text-lg">Backend</h1>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											Nodejs
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											Expressjs
										</li>
									</div>

									<div class="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											Mongodb
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											mongoose
										</li>
									</div>

									<div class="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											RESTful api
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											axios
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										GraphQL
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										websocket
									</li>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										Server Sent Events (SSE)
									</li>
								</div>
								<div className="flex flex-col gap-2 border-2 hover:border-black p-2 rounded-md">
									<h1 className="font-bold uppercase text-lg">
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
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											react-toastify
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											moment
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											framer-motion
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											react-pdf/renderer
										</li>
									</div>
									<div class="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											cmdk
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											clsx
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											tiptap-react
										</li>
									</div>
									<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
										bcypt and json web token (JWT)
									</li>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											nodemon
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											cors
										</li>{" "}
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											dotenv
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											nodemailer
										</li>
									</div>
									<div className="flex gap-2">
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											shadcn
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											lucide-react,
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											nextui
										</li>

										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											radixui
										</li>
										<li className="bg-blue-200 border-2 hover:border-black p-2 rounded-md">
											chartjs
										</li>
									</div>
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
