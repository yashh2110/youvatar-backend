const express = require("express");
const user = require(".");
const userRoute = express.Router();

userRoute.post("/signup", user.createAccount, user.sendOtp);
userRoute.post("/verify_otp", user.verifyOtp);
userRoute.post("/check_username", user.checkUserName);

module.exports = userRoute;
