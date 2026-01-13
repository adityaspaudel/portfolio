const Message = require("../models/messageModel");

// Controller---------------------------
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

// GET route to fetch all Messages
const getData = async (req, res) => {
	try {
		const data = await Message.find(); // Fetch all documents
		res.json(data); // Send data as JSON
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ error: "Failed to fetch data" });
	}
};

module.exports = { sendMessage, getData };
