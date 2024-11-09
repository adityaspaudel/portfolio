"use client";

import Image from "next/image";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const WelcomeHome = () => {
	return (
		<div>
			{/* social media sidebar ----------------------------------------*/}
			<div
				className="flex flex-col   bg-blue-100 text-5xl hover:bg-blue-50 fixed top-1/2  transform -translate-y-1/2
			rounded-tr-xl rounded-br-xl gap-4 ">
				<FaInstagram className="text-red-600  p-2 hover:bg-green-200 hover:rounded-tr-xl" />
				<FaLinkedin className="text-blue-600 p-2 hover:bg-green-200" />
				<FaTwitter className="text-blue-600 p-2 hover:bg-green-200" />
				<FaGithub className="text-black p-2 hover:bg-green-200 hover:rounded-br-xl" />
			</div>
			{/* Avatar and Menubar --------------------------------------*/}
			<div className="flex justify-between bg-blue-50 p-2 uppercase text-black ">
				{/* avatar and name---------------------------------------- */}
				<div className="flex gap-4 font-bold justify-center items-center">
					<Image
						className="h-[50px] w-[50px] rounded-3xl "
						src="/avatar-aaditya.jpg"
						height={50}
						width={50}
						alt="avatar-aaditya"
					/>
					<div>Aaditya Paudel</div>
				</div>
				{/* menu bar----------------------------------------------*/}
				<div className="flex gap-20 bg-blue-50   mt-0 justify-center items-center fixed top-0 right-0 ">
					<div className="p-5 hover:bg-blue-200">Home</div>
					<div className="p-5 hover:bg-blue-200">About</div>
					<div className="p-5 hover:bg-blue-200">Projects</div>
					<div className="p-5 hover:bg-blue-200">Contact</div>
				</div>
			</div>
			<div className="flex flex-col gap-4 justify-center items-center">
				<div className=" text-6xl font-bold uppercase">
					👋 Hello there, I'm Aaditya Paudel
				</div>
				<div className="flex flex-col gap-4 w-[400px] m-auto">
					<li>
						🎓 I'm a bachelor degree graduate in Bachelor of Computer
						Application (BCA).
					</li>
					<li>
						🥰 I'm a passionate web developer specializing in modern JavaScript
						with Reactjs, Nextjs and Nodejs with Expressjs and Responsive Web
						Design.
					</li>
				</div>
				{/* About me----------------------------------------------- */}
				<div className="flex flex-col justify-center items-center">
					<h1>More about me</h1>
					<div className="flex justify-between gap-[100px]">
						<div className="w-[400px]">
							<li>
								🔭 I’m currently focussed on my team project augMern, and other
								two personal projects miniProjects, socialmedia
							</li>
							<li>
								🌱 I’m actively learning MERN stack at BroadwayInfosis and self
								teaching myself with online documentation with w3Schools, MDN
								web docs, freeCodeCamp etc like popular web documentation &
								online practicing platforms.
							</li>
						</div>
						<div className="w-[400px]">
							<h1>My skills</h1>
							<div>
								<li>html</li>
								<li>css</li>
								<li>tailwindcss</li>
								<li>javascript</li>
								<li>reactjs</li>
								<li>nextjs</li>
								<li>restapi</li>
								<li>vscode</li>
							</div>
						</div>
					</div>
				</div>
			</div>{" "}
		</div>
	);
};

export default WelcomeHome;