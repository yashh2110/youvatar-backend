const crypto = require("crypto");
const { aws_s3_bucket_name } = require("../../config/config");
const { default: s3 } = require("../../config/s3.config");

module.exports.getSignedUrlForS3 = async (req, res) => {
  const Key = crypto.randomBytes(16).toString("hex");
  const params = {
    Bucket: aws_s3_bucket_name,
    Key,
    Expires: 60,
  };
  try {
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return res.status(200).json({ url: uploadURL });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "something went wrong" });
  }
};
