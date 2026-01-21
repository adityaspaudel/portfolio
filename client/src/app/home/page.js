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
			<header className="flex justify-between items-center p-4 bg-white shadow-md">
				<Link
					href={`https://github.com/adityaspaudel`}
					className="flex items-center gap-3"
				>
					<Image
						src="/avatar-aaditya.jpg"
						height={60}
						width={60}
						alt="avatar"
						className="rounded-full"
					/>
					<h1 className="font-bold text-xl">Aaditya Paudel</h1>
				</Link>
				<nav className="flex gap-6 text-gray-600 text-lg">
					<a href="#home">
						<span className="hover:text-blue-600 cursor-pointer hover:underline">
							Home
						</span>
					</a>
					<span className="hover:text-blue-600 cursor-pointer hover:underline">
						About
					</span>
					<a href="#projects">
						<span className="hover:text-blue-600 cursor-pointer hover:underline">
							Projects
						</span>
					</a>
					<a href="#contacts">
						<span className="hover:text-blue-600 cursor-pointer hover:underline">
							Contact
						</span>
					</a>
				</nav>
			</header>
			<div className="w-full mt-4 flex justify-center">
				<div className="relative h-[400px] w-[80%] rounded-xl overflow-hidden">
					{/* Background Image */}
					<img
						src="/photoCover.jpg"
						alt="Cover"
						className="object-cover h-[600px] w-full"
					/>

					{/* Dark Overlay */}
					<div className="absolute inset-0 bg-black/50" />

					{/* Content */}
					<section
						id="home"
						className="absolute inset-0 flex flex-col items-end justify-center text-right px-6 md:px-16"
					>
						<h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-black bg-blue-50/20 px-6 py-3 rounded-lg shadow-lg">
							{displayedText}
						</h1>

						<p className="mt-6 max-w-2xl text-gray-200 leading-relaxed text-sm md:text-base">
							I`m a passionate web developer specializing in modern JavaScript,
							React.js, Next.js, and Node.js. Constantly learning and building
							real-world projects to sharpen my skills.
						</p>
					</section>
				</div>
			</div>

			{/* Social Icons */}
			<div
				className="fixed top-1/2 left-2 -translate-y-1/2 flex flex-col gap-4 text-2xl"
				id="contacts"
			>
				<a href="https://github.com/adityaspaudel" target="_blank">
					<FaGithub className="hover:text-blue-600" />
				</a>
				<a href="https://www.linkedin.com/in/adityaspaudel/" target="_blank">
					<FaLinkedin className="hover:text-blue-600" />
				</a>
				<a href="https://x.com/adityaspaudel" target="_blank">
					<FaTwitter className="hover:text-blue-600" />
				</a>
				<a href="https://www.instagram.com/adityas.paudel/" target="_blank">
					<FaInstagram className="hover:text-blue-600" />
				</a>
			</div>

			{/* Hero Section */}
			{/* <section
				className="flex flex-col justify-center items-center text-center py-16"
				id="home"
			>
				<h2 className="text-4xl font-bold bg-blue-500 text-white px-6 py-2 rounded">
					{displayedText}
				</h2>
				<p className="mt-6 max-w-2xl text-gray-700 leading-relaxed">
					I`m a passionate web developer specializing in modern JavaScript,
					React.js, Next.js, Node.js, and responsive web design. Constantly
					learning and building projects to improve my craft.
				</p>
			</section> */}

			{/* Skills Section */}
			<section className="px-6 py-10 bg-white">
				<h2 className="text-2xl font-bold text-center mb-6">My Skills</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<div className="border p-4 rounded-md bg-blue-50">
						<h3 className="font-bold mb-2">Frontend</h3>
						<ul className="list-disc list-inside text-sm space-y-1">
							<li>React.js, Next.js</li>
							<li>Redux Toolkit, React-Redux</li>
							<li>Tailwind CSS, HTML5, CSS3</li>
							<li>Formik & Yup</li>
						</ul>
					</div>
					<div className="border p-4 rounded-md bg-blue-50">
						<h3 className="font-bold mb-2">Backend</h3>
						<ul className="list-disc list-inside text-sm space-y-1">
							<li>Node.js, Express.js</li>
							<li>MongoDB, Mongoose</li>
							<li>REST APIs, Axios</li>
							<li>WebSocket, JWT, bcrypt</li>
						</ul>
					</div>
					<div className="border p-4 rounded-md bg-blue-50">
						<h3 className="font-bold mb-2">Tools & Libraries</h3>
						<ul className="list-disc list-inside text-sm space-y-1">
							<li>Git & GitHub, VSCode, Postman</li>
							<li>React-Toastify, Framer Motion</li>
							<li>shadcn/ui, Chart.js</li>
							<li>dotenv, nodemon, cors</li>
						</ul>
					</div>
				</div>
			</section>
			<section className="flex flex-col content-center items-center text-black mt-2">
				<h1 className="text-2xl font-bold">My Projects</h1>
				<div className="flex w-full justify-around items-center" id="projects">
					<div className="hover:bg-blue-100 p-6">
						<Link
							href="https://github.com/adityaspaudel/socialmedia"
							className="font-bold hover:underline hover:text-blue-600"
						>
							Socialmedia
						</Link>
						<p>A Socialmedia Website</p>
					</div>
					<div className="hover:bg-blue-100 p-6">
						<Link
							href={`https://github.com/adityaspaudel/eKharid`}
							className="font-bold hover:underline hover:text-blue-600"
						>
							eKharid
						</Link>
						<p>An E-commerce Website</p>
						{/* <ul>
              <li>Frontend</li>
              <li>React.js (Hooks & Context API)</li>
              <li>Next.js (App Router)</li>
              <li>Tailwind CSS</li>
              <li>Redux Toolkit</li>
              <li>Formik & Yup</li>
            </ul>
            <ul>
              <li>Node.js & Express.js</li>
              <li>MongoDB with Mongoose ORM</li>{" "}
              <li>JWT Authentication & bcrypt</li>
            </ul> */}
					</div>
					<div className="hover:bg-blue-100 p-6">
						<Link
							href={`https://github.com/adityaspaudel/niwaas`}
							className="font-bold hover:underline hover:text-blue-600"
						>
							Niwaas
						</Link>
						<p>A Hotel Management System</p>
					</div>
					<div className="hover:bg-blue-100 p-6">
						<Link
							href={`https://github.com/adityaspaudel/miniProjects`}
							className="font-bold hover:underline hover:text-blue-600"
						>
							MiniProjects
						</Link>
						<p> 30+ small projects</p>
					</div>
				</div>
			</section>
			{/* Contact Section */}
			<section className="flex flex-col md:flex-row justify-center gap-8 py-12 px-6">
				<form
					onSubmit={handleSubmit}
					className="border rounded-md bg-white p-6 w-full max-w-md shadow-sm"
				>
					<h2 className="text-xl font-bold mb-4 text-center">Message Me</h2>
					<input
						name="fullName"
						type="text"
						placeholder="Full Name"
						className="border p-2 w-full mb-3 rounded"
						value={formData.fullName}
						onChange={handleChange}
						required
					/>
					<input
						name="email"
						type="email"
						placeholder="Email"
						className="border p-2 w-full mb-3 rounded"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						name="age"
						type="number"
						max="70"
						placeholder="Age"
						className="border p-2 w-full mb-3 rounded"
						value={formData.age}
						onChange={handleChange}
					/>
					<textarea
						name="textMessage"
						placeholder="Message"
						className="border p-2 w-full mb-3 rounded"
						rows="4"
						value={formData.textMessage}
						onChange={handleChange}
						required
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
					>
						Submit
					</button>
				</form>

				{/* Messages */}
				<div className="bg-white border rounded-md p-6 shadow-sm w-full h-96 max-w-md overflow-auto">
					<h2 className="text-xl font-bold mb-4">Previous Messages</h2>
					<ul className="space-y-2 text-sm">
						{data.length > 0 ? (
							data.map((item) => (
								<li key={item._id} className="border-b p-2 hover:bg-blue-100 ">
									<span className="font-semibold text-blue-700">
										{item.fullName}
									</span>
									: {item.textMessage}
								</li>
							))
						) : (
							<p className="text-gray-500">No messages yet.</p>
						)}
					</ul>
				</div>
			</section>

			<ToastContainer />
		</div>
	);
}
