const express = require("express");
const user = require(".");
const middleware = require("../../middleware");
const userRoute = express.Router();

userRoute.post("/signup", user.createAccount, user.sendOtp);
userRoute.post("/verify_otp", user.verifyOtp, user.createSession);
userRoute.post("/details", middleware.validateUser, user.completeProfile);

module.exports = userRoute;
