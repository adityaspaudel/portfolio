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
import { motion } from "framer-motion";
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
		: "bg-gray-100 text-gray-900";

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
		<div className={`font-sans min-h-screen  ${bgMain}`}>
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
					className={`flex items-center justify-center w-12 h-12 rounded-full  shadow-md hover:bg-gray-100 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
					aria-label="GitHub"
				>
					<FaGithub className="text-gray-800 text-xl" />
				</a>
				<a
					href="https://www.linkedin.com/in/adityaspaudel/"
					target="_blank"
					rel="noopener noreferrer"
					className={`flex items-center justify-center w-12 h-12 rounded-full  shadow-md hover:bg-blue-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
					aria-label="LinkedIn"
				>
					<FaLinkedin className="text-blue-700 text-xl" />
				</a>
				<a
					href="https://x.com/adityaspaudel"
					target="_blank"
					rel="noopener noreferrer"
					className={`flex items-center justify-center w-12 h-12 rounded-full  shadow-md hover:bg-blue-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
					aria-label="X / Twitter"
				>
					<FaTwitter className="text-blue-500 text-xl" />
				</a>
				<a
					href="https://www.instagram.com/adities.paudel/"
					target="_blank"
					rel="noopener noreferrer"
					className={`flex items-center justify-center w-12 h-12 rounded-full  shadow-md hover:bg-pink-50 hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white`}
					aria-label="Instagram"
				>
					<FaInstagram className="text-pink-500 text-xl" />
				</a>
			</div>

			{/* Skills Section */}
			<motion.section
				className={`mt-6 px-20 ${bgMain}`}
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, ease: "easeOut" }}
			>
				<h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>

				<div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
					{/* Frontend */}
					<motion.div
						className={`flex-1 min-w-[250px] max-w-[350px] rounded-xl shadow-md 
        hover:shadow-xl transition-all duration-300 p-6 
        border-t-4 border-blue-500 ${bgCard}`}
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.1,
						}}
						whileHover={{ y: -10, scale: 1.04 }}
					>
						<h3 className="text-xl font-semibold mb-4">Frontend</h3>
						<ul className="list-disc list-inside space-y-2 text-sm">
							<li>React.js, Next.js (App Router)</li>
							<li>Redux Toolkit, React-Redux, Redux-Persist</li>
							<li>Modern Javascript (ES6+), Tailwind CSS </li>
							<li>REST APIs, Axios</li>
							<li>Formik & Yup</li>
							<li>Shadcn/UI, Lucide-React, Chart.js</li>
						</ul>
					</motion.div>

					{/* Backend */}
					<motion.div
						className={`flex-1 min-w-[250px] max-w-[350px] rounded-xl shadow-md 
        hover:shadow-xl transition-all duration-300 p-6 
        border-t-4 border-green-500 ${bgCard}`}
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.2,
						}}
						whileHover={{ y: -10, scale: 1.04 }}
					>
						<h3 className="text-xl font-semibold mb-4">Backend</h3>
						<ul className="list-disc list-inside space-y-2 text-sm">
							<li>Node.js, Express.js</li>
							<li>MongoDB, Mongoose</li>
							<li>Bcrypt, JSON Web Token (JWT)</li>
							<li>Multer, Cloudinary </li>
							<li>Socket-io, Nodemailer</li>
						</ul>
					</motion.div>

					{/* Tools */}
					<motion.div
						className={`flex-1 min-w-[250px] max-w-[350px] rounded-xl shadow-md 
        hover:shadow-xl transition-all duration-300 p-6 
        border-t-4 border-purple-500 ${bgCard}`}
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.3,
						}}
						whileHover={{ y: -10, scale: 1.04 }}
					>
						<h3 className="text-xl font-semibold mb-4">Tools & Libraries</h3>
						<ul className="list-disc list-inside space-y-2 text-sm">
							<li>Git & GitHub, VSCode, Postman</li>
							<li>NPM, PNPM</li>
							<li>Framer Motion, React-Toastify </li>
							<li>Dotenv, Nodemon, CORS</li>
							
						</ul>
					</motion.div>
				</div>
			</motion.section>

			{/* Projects Section */}
			<motion.section
				className={`mt-6 px-20 ${bgMain}`}
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>

				<motion.div
					id="projects"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={{
						hidden: { opacity: 0 },
						show: {
							opacity: 1,
							transition: { staggerChildren: 0.15 },
						},
					}}
				>
					{/* Socialmedia */}
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 30, scale: 0.95 },
							show: {
								opacity: 1,
								y: 0,
								scale: 1,
								transition: { duration: 0.5, ease: "easeOut" },
							},
						}}
						whileHover={{ y: -8, scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<ProjectCard
							title="MeroSanjal"
							githubLink="https://github.com/adityaspaudel/socialmedia"
							deployLink="https://merosanjal.vercel.app/"
							desc="A Social Media Website"
							imagess={`/merosanjal.png`}
							items={[
								"Full-stack MERN app using Next.js App Router and Express + MongoDB.",
								"JWT authentication, profiles, posts, likes, comments, and follow system.",
								"Real-time updates with Socket.io and image uploads via Cloudinary.",
								"Styled with Tailwind, Shadcn, NextUI and deployed on Vercel & Render.",
							]}
							isDark={isDark}
						/>
					</motion.div>

					{/* eKharid */}
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 30, scale: 0.95 },
							show: {
								opacity: 1,
								y: 0,
								scale: 1,
								transition: { duration: 0.5, ease: "easeOut" },
							},
						}}
						whileHover={{ y: -8, scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<ProjectCard
							title="eKharid"
							githubLink="https://github.com/adityaspaudel/eKharid"
							deployLink="https://ekharid-fe.vercel.app"
							imagess={`/ekharid.png`}
							desc="An E-commerce Website"
							items={[
								"Full-stack e-commerce app built with Next.js and Express + MongoDB.",
								"Secure authentication using JWT & bcrypt with role-based access.",
								"Product management, image uploads, search & filters.",
								"Cart, checkout, order tracking with scalable MERN architecture.",
							]}
							isDark={isDark}
						/>
					</motion.div>

					{/* MiniProjects */}
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 30, scale: 0.95 },
							show: {
								opacity: 1,
								y: 0,
								scale: 1,
								transition: { duration: 0.5, ease: "easeOut" },
							},
						}}
						whileHover={{ y: -8, scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<ProjectCard
							title="MiniProjects"
							githubLink="https://github.com/adityaspaudel/miniProjects"
							deployLink="https://mini-projects1-git-editing-aaditya-paudels-projects.vercel.app/"
							imagess={`/miniprojects.png`}
							desc="50+ Small React Projects"
							items={[
								"Curated collection of React projects using modern practices.",
								"Categorized into Games, Redux Apps, and Utility Apps.",
								"Covers hooks, Redux Toolkit, routing, APIs, and local storage.",
								"Ideal for hands-on practice and real-world React mastery.",
							]}
							isDark={isDark}
						/>
					</motion.div>
				</motion.div>
			</motion.section>

			{/* Contact Section */}
			<section
				className={`flex flex-col md:flex-row justify-center gap-10 py-12 px-6 ${bgMain}`}
			>
				{/* Contact Form */}
				<form
					onSubmit={handleSubmit}
					className="rounded-2xl shadow-lg p-8 w-full min-h-96 max-w-md border-t-4 border-blue-500 transition-transform hover:-translate-y-1 duration-300"
				>
					<h2 className={`text-2xl font-bold mb-6 text-center  ${bgMain}`}>
						Message Me
					</h2>
					<input
						name="fullName"
						type="text"
						placeholder="Full Name"
						className={`border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${bgCard}`}
						value={formData.fullName}
						onChange={handleChange}
						required
					/>
					<input
						name="email"
						type="email"
						placeholder="Email"
						className={`border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${bgCard}`}
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						name="age"
						type="number"
						max="70"
						placeholder="Age"
						className={`border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${bgCard}`}
						value={formData.age}
						onChange={handleChange}
					/>
					<textarea
						name="textMessage"
						placeholder="Message"
						className={`border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${bgCard}`}
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
					className={` rounded-2xl shadow-lg p-6 w-full max-w-md border-t-4 border-green-500 overflow-y-auto h-[500px] relative ${bgMain}`}
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
function ProjectCard({
	title,
	githubLink,
	deployLink,
	desc,
	items,
	imagess,
	isDark,
}) {
	const cardBg = isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-black";

	return (
		<div
			className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl 
      transition-all duration-300 ${cardBg}`}
		>
			{/* 🔥 HERO IMAGE */}
			<div className="relative h-40 w-full overflow-hidden">
				<img
					src={imagess}
					alt={title}
					className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
				/>

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

				{/* Title on image */}
				<h3 className="absolute bottom-3 left-4 text-lg font-semibold text-white">
					{title}
				</h3>
			</div>

			{/* CONTENT */}
			<div className="p-6 h-80">
				<div className="flex flex-col gap-2 text-sm">
					<div className="flex items-center gap-2">
						<span className="font-medium text-gray-500">GitHub:</span>
						<Link
							href={githubLink}
							target="_blank"
							className="font-semibold text-blue-600 hover:underline"
						>
							View Repository
						</Link>
					</div>

					<div className="flex items-center gap-2">
						<span className="font-medium text-gray-500">Live:</span>
						<Link
							href={deployLink}
							target="_blank"
							className="font-semibold text-blue-600 hover:underline"
						>
							Open Project
						</Link>
					</div>
				</div>

				<p className="text-sm mb-4">{desc}</p>

				<ul className="space-y-2 text-sm">
					{items.map((item, idx) => (
						<li key={idx} className="flex gap-2">
							<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
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
