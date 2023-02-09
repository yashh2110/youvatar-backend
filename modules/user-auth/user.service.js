const {
  getTimeInMills,
  getYearsInMills,
} = require("../../helpers/get-current-time");
const { getUuid } = require("../../helpers/get-uuid");
const userSchema = require("../../helpers/user-schema-validator");
const {
  createAccountByEmailQuery,
  createAccountByPhoneQuery,
  setOtpByEmailQuery,
  setOtpByPhoneQuery,
  verifyOtpByEmailQuery,
  verifyOtpByPhoneQuery,
  createUserSessionQuery,
  setUserDetailsQuery,
  loginQuery,
} = require("./user.dal");

module.exports.createAccountService = async (req, res, next) => {
  const { email, phone } = req.body;
  try {
    if (email) {
      console.log(email);

      const data = await createAccountByEmailQuery({ email });
      if (data?.res === "existing") return next();
    } else if (phone) {
      const data = await createAccountByPhoneQuery({ phone });
      console.log(data);
      if (data?.res === "existing") return next();
    } else {
      return res.status(400).json({ error: "Check the request body" });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      error: err.sqlMessage || err.message || "Something went wrong",
    });
  }
};

module.exports.sendOtpService = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const otp = "1234";
    let source;
    if (email) {
      await setOtpByEmailQuery({ email, otp });
      const email_split = email.split("@");
      const mask_length = email_split[0].length - 3;
      const mask_reveal = email_split[0].slice(0, 3);
      source = mask_reveal + "*".repeat(mask_length) + "@" + email_split[1];
    } else {
      await setOtpByPhoneQuery({ phone, otp });
      const mask_length = phone.length - 7;
      source = phone.slice(0, 6) + "*".repeat(mask_length) + phone.slice(-2);
    }
    return res.status(200).json({ msg: `OTP sent successfully to ${source}` });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.sqlMessage || err.message || "Something went wrong" });
  }
};

// verify otps

module.exports.verifyOtpService = async (req, res, next) => {
  const { otp, phone, email } = req.body;
  try {
    let data;
    if (email) {
      data = await verifyOtpByEmailQuery({ email });
    } else if (phone) {
      data = await verifyOtpByPhoneQuery({ phone });
    } else {
      return res.status(400).json({ error: "Check the request body" });
    }
    console.log(data);
    if (data?.length === 0)
      return res.status(404).json({ error: "User is not registered" });
    if (otp === data[0].otp) {
      const time = getTimeInMills();
      if (time < data[0].expired_at) return next();
      return res.status(401).json({ error: "OTP expired" });
    }
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

// verifying the otp ;

module.exports.createUserSessionService = async (req, res, next) => {
  const { phone, email, source } = req.body;
  const session_token = getUuid();
  const src = phone || email || source;
  try {
    await createUserSessionQuery({ session_token, src });
    res.cookie("session_token", session_token, {
      maxAge: 900000,
      httpOnly: true,
    });
    return res.status(200).json({ msg: `Verification is a success` });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

module.exports.completeUserProfileService = async (req, res) => {
  // console.log(req.query.user_id);
  const user_id = req.query.user_id;
  const user_data = req.body;
  try {
    await setUserDetailsQuery({ user_id, user_data });
    return res.status(200).json({ msg: "Account created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
  }
};

// login

module.exports.loginService = async (req, res, next) => {
  const { source, password } = req.body;
  try {
    const data = await loginQuery({ source, password });
    if (data.length === 0)
      return res.status(401).json({ error: "User is not registered" });
    const user_password = data[0].user_password;
    if (user_password !== password)
      return res.status(401).json({ error: "Password does not match" });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.sqlMessage || err || "Something went wrong" });
  }
};
