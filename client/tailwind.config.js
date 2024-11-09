/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			screens: {
				"2xs": "400px", //Extra extra small screens

				xs: "500px", // Extra small screens

				sm: "640px", // Small screens

				md: "768px", // Medium screens

				lg: "1024px", // Large screens

				xl: "1280px", // Extra large screens

				"2xl": "1536px", // Extra extra large screens
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
