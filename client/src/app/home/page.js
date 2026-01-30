"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/lib/redux/slices/themeSlice";

export default function WelcomeHome() {
	const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme.theme);

	// ✅ Theme helpers for cleaner classnames
	const isDark = theme === "dark";
	const bgMain = isDark
		? "bg-gray-900 text-gray-100"
		: "bg-gray-100 text-gray-900";
	const bgCard = isDark
		? "bg-gray-800 text-gray-100"
		: "bg-white text-gray-900";

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
	const [visible, setVisible] = useState(false);

	useEffect(() => setVisible(true), []);

	useEffect(() => {
		if (index < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[index]);
				setIndex((prev) => prev + 1);
			}, 100);

			return () => clearTimeout(timeout);
		}
	}, [index, text]);

	const fetchData = async () => {
		try {
			const res = await fetch(`${NEXT_PUBLIC_API_URL}/message/getMessage`);
			const jsonData = await res.json();
			setData(jsonData);
		} catch (err) {
			console.error("Error fetching data:", err);
		}
	};

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await fetch(`${NEXT_PUBLIC_API_URL}/message/getMessage`);
				const jsonData = await res.json();
				setData(jsonData);
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};

		fetchMessages(); // call it immediately
	}, [NEXT_PUBLIC_API_URL]);
	
	// Form handlers
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${NEXT_PUBLIC_API_URL}/message/sendMessage`, formData);
			toast.success("Message sent successfully!");
			setFormData({ fullName: "", email: "", age: "", textMessage: "" });
			fetchData();
		} catch (error) {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<div className={`font-sans min-h-screen px-8 ${bgMain}`}>
			{/* Header */}
			<header className={`sticky top-0 z-50 backdrop-blur shadow-sm ${bgCard}`}>
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
						<h1 className="font-bold text-xl">{`Aaditya Paudel`}</h1>
					</Link>

					<nav className="hidden md:flex items-center gap-6 text-sm font-medium">
						<button
							onClick={() => dispatch(toggleTheme())}
							className={`px-4 py-2 rounded transition ${
								isDark ? "bg-yellow-400 text-black" : "bg-gray-900 text-white"
							}`}
						>
							{isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
						</button>
						<a href="#home" className="hover:text-blue-500">
							Home
						</a>
						<a href="#about" className="hover:text-blue-500">
							About
						</a>
						<a href="#projects" className="hover:text-blue-500">
							Projects
						</a>
						<a href="#contacts" className="hover:text-blue-500">
							Contact
						</a>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="mt-6 flex justify-center px-4" id="about">
				<div className="relative w-full max-w-6xl h-[420px] rounded-2xl overflow-hidden shadow-lg">
					<Image
						src="/photoCover.jpg"
						alt="Cover"
						fill
						priority
						className="object-cover object-[center_15%] rounded-2xl"
						style={{ filter: "brightness(0.8)" }}
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/30" />

					<div
						className="relative z-10 h-full flex flex-col justify-center items-end text-right px-6 md:px-14"
						id="home"
					>
						<h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white bg-blue-600/20 px-6 py-3 rounded-lg backdrop-blur-md shadow-md">
							{displayedText}
						</h1>
						<div
							className={`mt-6 max-w-2xl text-gray-200 text-sm md:text-base leading-relaxed transform transition-all duration-2000 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
						>
							<p className="text-2xl font-bold">
								Bachelor in Computer Application (BCA) Graduate
							</p>
							<p>
								I’m a passionate web developer specializing in modern
								JavaScript, React.js, Next.js, and Node.js. Constantly learning
								and building real-world projects to sharpen my skills.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Social Icons */}
			<div
				className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col gap-4 z-50"
				id="contacts"
			>
				<a
					href="https://github.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="GitHub"
				>
					<FaGithub className="text-gray-800 text-xl" />
				</a>
				<a
					href="https://www.linkedin.com/in/adityaspaudel/"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-blue-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="LinkedIn"
				>
					<FaLinkedin className="text-blue-700 text-xl" />
				</a>
				<a
					href="https://x.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-blue-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="X / Twitter"
				>
					<FaTwitter className="text-blue-500 text-xl" />
				</a>
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
			<section className={`px-6 py-12 ${bgMain}`}>
				<h2 className="text-3xl font-bold text-center mb-10">My Skills</h2>
				<div
					className={`flex flex-wrap justify-center gap-6 max-w-6xl mx-auto`}
				>
					{/* Frontend */}
					<div
						className={`flex-1 min-w-[250px] max-w-[350px] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-blue-500 ${bgCard}`}
					>
						<h3 className="text-xl font-semibold mb-4">Frontend</h3>
						<ul className="list-disc list-inside space-y-2 text-sm">
							<li>React.js, Next.js (App Router)</li>
							<li>Redux Toolkit, React-Redux</li>
							<li>Tailwind CSS, HTML5, CSS3</li>
							<li>Formik & Yup</li>
						</ul>
					</div>

					{/* Backend */}
					<div
						className={`flex-1 min-w-[250px] max-w-[350px] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-green-500 ${bgCard}`}
					>
						<h3 className="text-xl font-semibold mb-4">Backend</h3>
						<ul className="list-disc list-inside space-y-2 text-sm">
							<li>Node.js, Express.js</li>
							<li>MongoDB, Mongoose</li>
							<li>REST APIs, Axios</li>
							<li>WebSockets, JWT, bcrypt</li>
							<li>Multer, Cloudinary</li>
						</ul>
					</div>

					{/* Tools */}
					<div
						className={`flex-1 min-w-[250px] max-w-[350px] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-purple-500 ${bgCard}`}
					>
						<h3 className="text-xl font-semibold mb-4">Tools & Libraries</h3>
						<ul className="list-disc list-inside space-y-2 text-sm">
							<li>Git & GitHub, VSCode, Postman</li>
							<li>React-Toastify, Framer Motion</li>
							<li>shadcn/ui, Chart.js</li>
							<li>dotenv, nodemon, cors</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section className={`mt-6 px-4 ${bgMain}`}>
				<h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>
				<div
					id="projects"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{/* Socialmedia */}
					<ProjectCard
						title="Socialmedia"
						link="https://github.com/adityaspaudel/socialmedia"
						desc="A Social Media Website"
						items={[
							"Full-stack MERN app using Next.js App Router and Express + MongoDB.",
							"JWT authentication, profiles, posts, likes, comments, and follow system.",
							"Real-time updates with Socket.io and image uploads via Cloudinary.",
							"Styled with Tailwind, Shadcn, NextUI and deployed on Vercel & Render.",
						]}
						isDark={isDark}
					/>

					{/* eKharid */}
					<ProjectCard
						title="eKharid"
						link="https://github.com/adityaspaudel/eKharid"
						desc="An E-commerce Website"
						items={[
							"Full-stack e-commerce app built with Next.js and Express + MongoDB.",
							"Secure authentication using JWT & bcrypt with role-based access.",
							"Product management, image uploads, search & filters.",
							"Cart, checkout, order tracking with scalable MERN architecture.",
						]}
						isDark={isDark}
					/>

					{/* MiniProjects */}
					<ProjectCard
						title="MiniProjects"
						link="https://github.com/adityaspaudel/miniProjects"
						desc="50+ Small React Projects"
						items={[
							"Curated collection of React projects using modern practices.",
							"Categorized into Games, Redux Apps, and Utility Apps.",
							"Covers hooks, Redux Toolkit, routing, APIs, and local storage.",
							"Ideal for hands-on practice and real-world React mastery.",
						]}
						isDark={isDark}
					/>
				</div>
			</section>

			{/* Contact Section */}
			<section
				className={`flex flex-col md:flex-row justify-center gap-8 py-12 px-6 ${bgMain}`}
			>
				{/* Contact Form */}
				<form
					onSubmit={handleSubmit}
					className="rounded-2xl shadow-lg p-8 w-full h-96 max-w-md border-t-4 border-blue-500 transition-transform hover:-translate-y-1 duration-300"
				>
					<h2
						className={`text-2xl font-bold mb-6 text-center text-gray-800 ${bgMain}`}
					>
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
						rows="2"
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
				<div
					className={`bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border-t-4 border-green-500 overflow-y-auto h-[500px] relative ${bgMain}`}
				>
					<h2 className="text-2xl font-bold mb-6 text-white text-center sticky top-0 bg-blue-500 p-2 z-10">
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

// ✅ ProjectCard Component to remove repetitive JSX
function ProjectCard({ title, link, desc, items, isDark }) {
	const cardBg = isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-black";
	return (
		<div
			className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 ${cardBg}`}
		>
			<Link
				href={link}
				className="text-xl font-semibold text-blue-600 hover:underline"
			>
				{title}
			</Link>
			<p className="text-sm mb-4">{desc}</p>
			<ul className="list-disc list-inside space-y-2 text-sm">
				{items.map((item, idx) => (
					<li key={idx}>{item}</li>
				))}
			</ul>
		</div>
	);
}

function AnimatedBio({ title, textExtra, typingSpeed = 30 }) {
	const [visible, setVisible] = useState(false);
	const [typedText, setTypedText] = useState("");

	useEffect(() => {
		setVisible(true);
		let index = 0;
		const interval = setInterval(() => {
			setTypedText((prev) => prev + textExtra[index]);
			index++;
			if (index === textExtra.length) clearInterval(interval);
		}, typingSpeed);
		return () => clearInterval(interval);
	}, [textExtra, typingSpeed]);

	const lines = typedText.split("\n");

	return (
		<div className="mt-6 max-w-2xl text-gray-200 text-sm md:text-base leading-relaxed">
			<h1
				className={`text-2xl underline mb-2 transition-all duration-700 ease-out transform ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
			>
				{title}
			</h1>
			{lines.map((line, index) => (
				<p
					key={index}
					className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
					style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
				>
					{line}
				</p>
			))}
		</div>
	);
}
