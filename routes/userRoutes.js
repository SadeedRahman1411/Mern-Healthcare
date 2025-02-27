const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { registerController, loginController, getUserInfoController, updateUserInfoController } = require("../controllers/userCtrl");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getUserInfo", authMiddleware, getUserInfoController);
router.put("/updateUserInfo", authMiddleware, updateUserInfoController); // New update route

module.exports = router;
