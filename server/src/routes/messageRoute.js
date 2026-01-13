const express = require("express");
const { sendMessage, getData } = require("../controllers/messageController");
const router = express.Router();

// Routes----------------------------------------
router.post("/sendMessage", sendMessage); // Corrected route setup
router.get("/getData", getData);

module.exports = router;
