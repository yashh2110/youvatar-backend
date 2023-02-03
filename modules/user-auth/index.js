const {
  createAccountService,
  sendOtpService,
  verifyOtpService,
  createUserSessionService,
  completeUserProfileService,
} = require("./user.service");

const user = {
  createAccount: createAccountService,
  sendOtp: sendOtpService,
  verifyOtp: verifyOtpService,
  createSession: createUserSessionService,
  completeProfile: completeUserProfileService,
};

module.exports = user;
