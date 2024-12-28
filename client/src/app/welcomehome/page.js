"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const WelcomeHome = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
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
			alert("Message sent successfully!");
			console.log("Response:", response.data);
			// Reset the form
			setFormData({
				fullName: "",
				email: "",
				textMessage: "",
			});
		} catch (error) {
			console.error("Error sending message:", error);
			alert("Failed to send message. Please try again.");
		}
	};

	return (
		<div>
			{/* Social Media Sidebar */}
			<div
				className="flex flex-col bg-blue-100 text-5xl hover:bg-blue-50 fixed top-1/2 transform -translate-y-1/2
        rounded-tr-xl rounded-br-xl gap-4">
				<FaInstagram className="text-red-600 p-2 hover:bg-green-200 hover:rounded-tr-xl" />
				<FaLinkedin className="text-blue-600 p-2 hover:bg-green-200" />
				<FaTwitter className="text-blue-600 p-2 hover:bg-green-200" />
				<FaGithub className="text-black p-2 hover:bg-green-200 hover:rounded-br-xl" />
			</div>

			{/* Avatar and Menubar */}
			<div className="flex justify-between bg-blue-50 p-2 uppercase text-black">
				<div className="flex gap-4 font-bold justify-center items-center">
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
					<div className="p-5 hover:bg-blue-200">Home</div>
					<div className="p-5 hover:bg-blue-200">About</div>
					<div className="p-5 hover:bg-blue-200">Projects</div>
					<div className="p-5 hover:bg-blue-200">Contact</div>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-4 justify-center items-center">
				<div className="text-6xl font-bold uppercase">
					👋 Hi there, I'm Aaditya Paudel
				</div>
				<div className="flex flex-col gap-4 w-[400px] m-auto">
					<li>
						🎓 I'm a bachelor degree graduate in Bachelor of Computer
						Application (BCA).
					</li>
					<li>
						🥰 I'm a passionate web developer specializing in modern JavaScript
						with Reactjs, Nextjs, and Nodejs with Expressjs and Responsive Web
						Design.
					</li>
				</div>

				{/* About Me */}
				<div className="flex flex-col justify-center items-center">
					<h1 className="uppercase font-bold text-3xl">About me</h1>
					<div className="flex justify-between gap-[100px]">
						<div className="w-[400px] list-none">
							<li>
								🔭 I’m currently focused on my team project augMern, and other
								two personal projects miniProjects, socialmedia
							</li>
							<li>
								🌱 I’m actively learning MERN stack at BroadwayInfosis and
								self-teaching myself with online documentation like w3Schools,
								MDN web docs, and freeCodeCamp.
							</li>
						</div>

						{/* Skills */}
						<div className="w-[400px] bg-blue-100 p-2 rounded-md">
							<h1 className="uppercase font-bold text-2xl">My skills</h1>
							<div className="flex gap-2 list-none uppercase text-sm">
								<div className="flex flex-col gap-2">
									<h2>My tech stack</h2>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										nextjs
									</li>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										reactjs
									</li>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										modern javascript
									</li>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										css
									</li>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										tailwind css
									</li>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										html
									</li>
								</div>
								<div className="flex flex-col gap-2">
									<h1>Other tools and libraries</h1>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										vscode
									</li>
									<li className="bg-blue-200 border-2 hover:border-blue-400 p-2 rounded-md">
										restapi
									</li>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Form */}
				<div>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-2 w-[400px]">
						<div className="flex flex-col">
							<label htmlFor="fullName">Full Name</label>
							<input
								className="border-2 p-2"
								name="fullName"
								placeholder="Enter your full name"
								type="text"
								value={formData.fullName}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="email">Email</label>
							<input
								className="border-2 p-2"
								name="email"
								type="email"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="textMessage">Message</label>
							<textarea
								className="border-2 p-2"
								name="textMessage"
								placeholder="Enter Message"
								value={formData.textMessage}
								onChange={handleChange}
							/>
						</div>
						<div className="flex">
							<button
								className="border-2 p-1 bg-red-400 hover:bg-green-400 rounded-sm text-white"
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
