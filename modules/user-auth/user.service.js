const {
  getTimeInMills,
  getYearsInMills,
} = require("../../helpers/get-current-time");
const { getUuid } = require("../../helpers/get-uuid");
const {
  createAccountByEmailQuery,
  createAccountByPhoneQuery,
  setOtpByEmailQuery,
  setOtpByPhoneQuery,
  verifyOtpByEmailQuery,
  verifyOtpByPhoneQuery,
  createUserSessionQuery,
  setUserDetailsQuery,
} = require("./user.dal");

module.exports.createAccountService = async (req, res, next) => {
  const { email, phone } = req.body;
  try {
    if (email) {
      const data = await createAccountByEmailQuery({ email });
      console.log(data);
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
    return res
      .status(400)
      .json({ error: err.sqlMessage || "Something went wrong" });
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
      .json({ error: err.sqlMessage || "Something went wrong" });
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
  const { phone, email } = req.body;
  const session_token = getUuid();
  const source = phone || email;
  try {
    await createUserSessionQuery({ session_token, source });
    return res
      .status(200)
      .json({ msg: `Verification is a success`, token: session_token });
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
