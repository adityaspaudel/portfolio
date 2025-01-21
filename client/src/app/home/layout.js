import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyLayout({ children }) {
	return (
		<div>
			<nav>{/* Your navigation */}</nav>
			<main>{children}</main>
			<ToastContainer /> {/* ToastContainer in the layout */}
			<footer>{/* Your footer */}</footer>
		</div>
	);
}

export default MyLayout;
