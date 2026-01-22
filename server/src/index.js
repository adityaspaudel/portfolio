const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const messageRoute = require("./routes/messageRoute");
const dbConnect = require("./db/connection");

dotenv.config();

const app = express();

// ---------------- MIDDLEWARES ----------------
app.use(express.json());
app.use(cors());

// ---------------- DATABASE ----------------
dbConnect();

// ---------------- ROUTES ----------------
app.use(messageRoute);
app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Portfolio API is running 🚀",
	});
});
// ---------------- 404 HANDLER ----------------
app.use((req, res, next) => {
	const error = new Error(`Route not found - ${req.originalUrl}`);
	error.statusCode = 404;
	next(error);
});

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
	console.error("🔥 Error:", err.message);

	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
});

// ---------------- PROCESS-LEVEL ERRORS ----------------

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.error("🔥 Unhandled Rejection:", err);
	server.close(() => process.exit(1));
});

// Uncaught Exception
process.on("uncaughtException", (err) => {
	console.error("🔥 Uncaught Exception:", err);
	process.exit(1);
});

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
