const aws = require("aws-sdk");
const {
  aws_s3_access_key,
  aws_s3_bucket_region,
  aws_s3_secret_access_key,
} = require("./config");

const s3 = new aws.S3({
  region: aws_s3_bucket_region,
  accessKeyId: aws_s3_access_key,
  secretAccessKey: aws_s3_secret_access_key,
  signatureVersion: "v4",
});

exports.default = s3;
