const {
  createAccountService,
  sendOtpService,
  verifyOtpService,
  createUserSessionService,
  completeUserProfileService,
  loginService,
  uploadProfileService,
} = require("./user.service");

const user = {
  createAccount: createAccountService,
  sendOtp: sendOtpService,
  verifyOtp: verifyOtpService,
  createSession: createUserSessionService,
  completeProfile: completeUserProfileService,
  login: loginService,
  uploadProfile: uploadProfileService,
};

module.exports = user;
