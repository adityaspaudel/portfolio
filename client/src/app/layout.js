import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/reduxProvider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Portfolio Website : Aaditya Paudel",
	description: "Personal Portfolio website",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
