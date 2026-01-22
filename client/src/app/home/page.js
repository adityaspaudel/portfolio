"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function WelcomeHome() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		age: "",
		textMessage: "",
	});
	const [data, setData] = useState([]);
	const text = "👋 Hello there, I'm Aaditya Paudel";
	const [displayedText, setDisplayedText] = useState("");
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[index]);
				setIndex((prev) => prev + 1);
			}, 100); // typing speed in ms

			return () => clearTimeout(timeout);
		}
	}, [index, text]);

	const fetchData = async () => {
		try {
			const res = await fetch("http://localhost:9000/message/getMessage");
			const jsonData = await res.json();
			setData(jsonData);
		} catch (err) {
			console.error("Error fetching data:", err);
		}
	};
	// Fetch messages
	useEffect(() => {
		fetchData();
	}, []);

	// Form handlers
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:9000/message/sendMessage", formData);
			toast.success("Message sent successfully!");
			setFormData({ fullName: "", email: "", age: "", textMessage: "" });
			fetchData();
		} catch (error) {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<div className="font-sans min-h-screen bg-blue-50 text-gray-800 px-8">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
					<Link
						href="https://github.com/adityaspaudel"
						className="flex items-center gap-3"
					>
						<Image
							src="/avatar-aaditya.jpg"
							height={56}
							width={56}
							alt="Aaditya Paudel"
							className="rounded-full ring-2 ring-blue-500"
						/>
						<h1 className="font-bold text-xl text-gray-800">Aaditya Paudel</h1>
					</Link>

					<nav className="hidden md:flex items-center gap-6 text-gray-600 text-sm font-medium">
						<a href="#home" className="hover:text-blue-600 transition-colors">
							Home
						</a>
						<a href="#about" className="hover:text-blue-600 transition-colors">
							About
						</a>
						<a
							href="#projects"
							className="hover:text-blue-600 transition-colors"
						>
							Projects
						</a>
						<a
							href="#contacts"
							className="hover:text-blue-600 transition-colors"
						>
							Contact
						</a>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="mt-6 flex justify-center px-4" id="about">
				<div className="relative w-full max-w-6xl h-[420px] rounded-2xl overflow-hidden shadow-lg">
					{/* Background Image */}
					<Image
						src="/photoCover.jpg"
						alt="Cover"
						fill
						priority
						className="object-cover object-[center_15%]"
					/>

					{/* Overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/30" />

					{/* Content */}
					<div
						id="home"
						className="relative z-10 h-full flex flex-col justify-center items-end text-right px-6 md:px-14"
					>
						<h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white bg-blue-600/20 px-6 py-3 rounded-lg backdrop-blur-md shadow-md">
							{displayedText}
						</h1>

						<p className="mt-6 max-w-2xl text-gray-200 text-sm md:text-base leading-relaxed">
							I’m a passionate web developer specializing in modern JavaScript,
							React.js, Next.js, and Node.js. Constantly learning and building
							real-world projects to sharpen my skills.
						</p>
					</div>
				</div>
			</section>

			{/* Social Icons */}
			<div
				className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col gap-4 z-50"
				id="contacts"
			>
				{/* GitHub */}
				<a
					href="https://github.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="GitHub"
				>
					<FaGithub className="text-gray-800 text-xl" />
				</a>

				{/* LinkedIn */}
				<a
					href="https://www.linkedin.com/in/adityaspaudel/"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-blue-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="LinkedIn"
				>
					<FaLinkedin className="text-blue-700 text-xl" />
				</a>

				{/* X / Twitter */}
				<a
					href="https://x.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-blue-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="X / Twitter"
				>
					<FaTwitter className="text-blue-500 text-xl" />
				</a>

				{/* Instagram */}
				<a
					href="https://www.instagram.com/adities.paudel/"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-pink-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
					aria-label="Instagram"
				>
					<FaInstagram className="text-pink-500 text-xl" />
				</a>
			</div>

			{/* Skills Section */}
			<section className="px-6 py-12 bg-gray-50">
				<h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
					My Skills
				</h2>

				<div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
					{/* Frontend */}
					<div className="flex-1 min-w-[250px] max-w-[350px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-blue-500">
						<h3 className="text-xl font-semibold mb-4 text-gray-800">
							Frontend
						</h3>
						<ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
							<li>React.js, Next.js (App Router)</li>
							<li>Redux Toolkit, React-Redux</li>
							<li>Tailwind CSS, HTML5, CSS3</li>
							<li>Formik & Yup</li>
						</ul>
					</div>

					{/* Backend */}
					<div className="flex-1 min-w-[250px] max-w-[350px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-green-500">
						<h3 className="text-xl font-semibold mb-4 text-gray-800">
							Backend
						</h3>
						<ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
							<li>Node.js, Express.js</li>
							<li>MongoDB, Mongoose</li>
							<li>REST APIs, Axios</li>
							<li>WebSockets, JWT, bcrypt</li>
							<li>Multer, Cloudinary</li>
						</ul>
					</div>

					{/* Tools */}
					<div className="flex-1 min-w-[250px] max-w-[350px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-purple-500">
						<h3 className="text-xl font-semibold mb-4 text-gray-800">
							Tools & Libraries
						</h3>
						<ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
							<li>Git & GitHub, VSCode, Postman</li>
							<li>React-Toastify, Framer Motion</li>
							<li>shadcn/ui, Chart.js</li>
							<li>dotenv, nodemon, cors</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Project showcase card  */}
			<section className="mt-6 px-4">
				<h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>

				<div
					id="projects"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{/* Social Media Project */}
					<div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
						<Link
							href="https://github.com/adityaspaudel/socialmedia"
							className="text-xl font-semibold text-blue-600 hover:underline"
						>
							Socialmedia
						</Link>
						<p className="text-sm text-gray-500 mb-4">A Social Media Website</p>

						<ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
							<li>
								Full-stack MERN app using Next.js App Router and Express +
								MongoDB.
							</li>
							<li>
								JWT authentication, profiles, posts, likes, comments, and follow
								system.
							</li>
							<li>
								Real-time updates with Socket.io and image uploads via
								Cloudinary.
							</li>
							<li>
								Styled with Tailwind, Shadcn, NextUI and deployed on Vercel &
								Render.
							</li>
						</ul>
					</div>

					{/* eKharid Project */}
					<div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
						<Link
							href="https://github.com/adityaspaudel/eKharid"
							className="text-xl font-semibold text-blue-600 hover:underline"
						>
							eKharid
						</Link>
						<p className="text-sm text-gray-500 mb-4">An E-commerce Website</p>

						<ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
							<li>
								Full-stack e-commerce app built with Next.js and Express +
								MongoDB.
							</li>
							<li>
								Secure authentication using JWT & bcrypt with role-based access.
							</li>
							<li>Product management, image uploads, search & filters.</li>
							<li>
								Cart, checkout, order tracking with scalable MERN architecture.
							</li>
						</ul>
					</div>

					{/* Mini Projects */}
					<div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
						<Link
							href="https://github.com/adityaspaudel/miniProjects"
							className="text-xl font-semibold text-blue-600 hover:underline"
						>
							MiniProjects
						</Link>
						<p className="text-sm text-gray-500 mb-4">
							50+ Small React Projects
						</p>

						<ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
							<li>
								Curated collection of React projects using modern practices.
							</li>
							<li>Categorized into Games, Redux Apps, and Utility Apps.</li>
							<li>
								Covers hooks, Redux Toolkit, routing, APIs, and local storage.
							</li>
							<li>Ideal for hands-on practice and real-world React mastery.</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="flex flex-col md:flex-row justify-center gap-8 py-12 px-6 bg-gray-50">
				{/* Contact Form */}
				<form
					onSubmit={handleSubmit}
					className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border-t-4 border-blue-500 transition-transform hover:-translate-y-1 duration-300"
				>
					<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
						Message Me
					</h2>

					<input
						name="fullName"
						type="text"
						placeholder="Full Name"
						className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						value={formData.fullName}
						onChange={handleChange}
						required
					/>

					<input
						name="email"
						type="email"
						placeholder="Email"
						className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<input
						name="age"
						type="number"
						max="70"
						placeholder="Age"
						className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						value={formData.age}
						onChange={handleChange}
					/>

					<textarea
						name="textMessage"
						placeholder="Message"
						className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						rows="5"
						value={formData.textMessage}
						onChange={handleChange}
						required
					/>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
					>
						Submit
					</button>
				</form>

				{/* Previous Messages */}
				<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border-t-4 border-green-500 overflow-y-auto h-96">
					<h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
						Previous Messages
					</h2>

					{data.length > 0 ? (
						<ul className="space-y-3">
							{data.map((item) => (
								<li
									key={item._id}
									className="border border-gray-200 p-3 rounded-lg hover:bg-green-50 transition-colors"
								>
									<span className="font-semibold text-green-700">
										{item.fullName}
									</span>
									: <span className="text-gray-700">{item.textMessage}</span>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500 text-center">No messages yet.</p>
					)}
				</div>
			</section>

			<ToastContainer />
		</div>
	);
}
