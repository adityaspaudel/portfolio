"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const skills = [
	{
		title: "HTML, CSS & Modern JavaScript",
		description:
			"Built strong foundations in semantic HTML, responsive design, ES6+ features, and core web concepts.",
		year: "2024",
	},
	{
		title: "React.js Ecosystem",
		description:
			"Learned hooks, reusable components, state management, Redux Toolkit, React‑Redux, and Redux‑Persist.",
		year: "2024",
	},
	{
		title: "UI, Styling & Forms",
		description:
			"Worked with Tailwind CSS, Shadcn/UI, Lucide‑React, Chart.js, Formik, Yup and clean UI patterns.",
		year: "2024",
	},
	{
		title: "Developer Tools & Workflow",
		description:
			"Daily workflow with Git, GitHub, VS Code, Postman, NPM/PNPM, environment configs, CORS, Nodemon",
		year: "2024",
	},
	{
		title: "Next.js Full‑Stack Development",
		description:
			"Used Next.js App Router, REST APIs, Axios, SSR concepts, and production‑ready frontend architecture.",
		year: "2025",
	},
	{
		title: "Backend Development with Node.js",
		description:
			"Built APIs using Node.js, Express.js, MongoDB, and Mongoose with authentication and security best practices.",
		year: "2025",
	},
	{
		title: "Advanced Backend Features",
		description:
			"Implemented JWT auth, bcrypt hashing, file uploads with Multer & Cloudinary, Socket.io real‑time features, and Nodemailer.",
		year: "2025",
	},
];

export default function FullstackJourneyTimeline({ isDark, bgMain, bgCard }) {
	return (
		<div
			className={`min-h-screen bg-gradient-to-b ${bgMain} ${
				isDark ? "text-white" : "text-black"
			} py-16 px-6`}
		>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
					My MERN Stack Journey
				</h1>

				<div className="relative border-l-2 border-slate-300 dark:border-slate-700">
					{skills.map((skill, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -40 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="mb-12 ml-6 group"
						>
							{/* Timeline Dot */}
							<span className="absolute -left-[14px] flex items-center justify-center w-7 h-7 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-full shadow group-hover:scale-110 transition-transform">
								<CheckCircle className="w-4 h-4 text-emerald-500" />
							</span>

							{/* Card */}
							<div
								className={`${bgCard} ${
									isDark ? "text-slate-300" : "text-slate-600"
								} rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-emerald-400/30`}
							>
								<time className="text-xs uppercase tracking-widest font-semibold text-emerald-500">
									{skill.year}
								</time>

								<h3 className="text-xl font-semibold mt-2 leading-snug">
									{skill.title}
								</h3>

								<p className="mt-2 text-sm md:text-base leading-relaxed">
									{skill.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
