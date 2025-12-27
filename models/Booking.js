const express = require("express");
const { bookSession } = require("../controllers/bookingController");
const router = express.Router();

router.post("/book", bookSession);

module.exports = router;
