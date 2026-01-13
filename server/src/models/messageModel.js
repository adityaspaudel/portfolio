const mongoose = require("mongoose");


// Mongoose Schema and Model------------------------------
const messageSchema = new mongoose.Schema(
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
const Message = mongoose.model("Message", messageSchema); // Create the Message model

module.exports = Message;
