// ambulanceRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { registerAmbulance, getAmbulances } = require("../controllers/ambulanceCtrl");

router.post("/register", authMiddleware, registerAmbulance);
router.get("/all", authMiddleware, getAmbulances);

module.exports = router;