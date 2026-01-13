const express = require("express");
const { sendMessage, getData } = require("../controllers/messageController");
const router = express.Router();

// Routes----------------------------------------
router.post("/message/sendMessage", sendMessage); // Corrected route setup
router.get("/message/getMessage", getData);

module.exports = router;
