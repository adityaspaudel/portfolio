const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv").config();

const port = process.env.PORT; // Updated port to match your example

// MongoDB Connection
const dbConnect = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/portfolio");
		console.log("Successfully connected to MongoDB");
	} catch (err) {
		console.error("Error occurred:", err);
	}
};
dbConnect();

// Middleware
app.use(express.json()); // Corrected `app.use(json.express)` to `express.json()`
app.use(cors());

// Mongoose Schema and Model
const MessageSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, "Full Name is required"],
			trim: true,
			minlength: [3, "Full Name must be at least 3 characters long"],
			maxlength: [50, "Full Name must not exceed 50 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			validate: {
				validator: function (v) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regex for email validation
				},
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		age: {
			type: Number,
			required: [true, "age is required"],
			trim: true,
			min: [1, "too young, age should at least 10"],
			max: [70, "too old, age must be below 70"],
		},
		textMessage: {
			type: String,
			required: [true, "Message is required"],
			trim: true,
			minlength: [2, "Message must be at least 2 characters long"],
			maxlength: [200, "Message must not exceed 500 characters"],
		},
	},
	{
		timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
	}
);
const Message = mongoose.model("Message", MessageSchema); // Create the Message model

// Controller
const sendMessage = async (req, res) => {
	try {
		const { fullName, email, age, textMessage } = req.body;

		// Validate the data
		if (!fullName || !email || !age || !textMessage) {
			return res.status(400).json({ error: "All fields are required." });
		}

		// Save the message to the database
		const newMessage = new Message({ fullName, email, age, textMessage });
		await newMessage.save();

		return res.status(201).json({ message: "Message sent successfully!" });
	} catch (error) {
		console.error("Error saving message:", error);
		return res.status(500).json({ error: "Failed to send the message." });
	}
};

// Routes
app.post("/sendMessage", sendMessage); // Corrected route setup
app.get("/", (req, res) => {
	res.send("Hello Guys!! " + res);
});

// Start the Server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
