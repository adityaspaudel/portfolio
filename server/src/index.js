const express = require("express");
const cors = require("cors");
const messageRoute = require("./routes/messageRoute");
const app = express();
// dotenv config
const dotenv = require("dotenv");
const dbConnect = require("./db/connection");
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// database Connection
dbConnect();

// routes
app.use(messageRoute);
// Start the Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
