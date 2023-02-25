require("dotenv").config();

// mysql
let mysql_url;
let mysql_password;
let mysql_username;
let mysql_port;
let mysql_database;

// REDIS
let redis_url;
let redis_password;
let redis_port;

// server port
let port;

if (process.env.NODE_ENV === "development") {
  mysql_url = process.env.MYSQL_DEV_HOSTNAME;
  mysql_username = process.env.MYSQL_DEV_USERNAME;
  mysql_password = process.env.MYSQL_DEV_PASSWORD;
  mysql_port = process.env.MYSQL_DEV_PORT;
  mysql_database = process.env.MYSQL_DEV_DATABASE;

  redis_url = process.env.REDIS_DEV_HOSTNAME;
  redis_password = process.env.REDIS_DEV_PASSWORD;
  5;
  redis_port = process.env.REDIS_DEV_PORT;

  aws_s3_bucket_name = process.env.AWS_S3_BUCKET_NAME;
  aws_s3_bucket_region = process.env.AWS_S3_REGION;
  aws_s3_access_key = process.env.AWS_S3_ACCESS_KEY;
  aws_s3_secret_access_key = process.env.AWS_S3_SECRET_ACCESS_KEY;

  port = process.env.DEV_PORT;
}
if (process.env.NODE_ENV === "production") {
  mysql_url = process.env.MYSQL_PROD_HOSTNAME;
  mysql_username = process.env.MYSQL_PROD_USERNAME;
  mysql_password = process.env.MYSQL_PROD_PASSWORD;
  mysql_port = process.env.MYSQL_PROD_PORT;
  mysql_database = process.env.MYSQL_PROD_DATABASE;

  redis_url = process.env.REDIS_PROD_HOSTNAME;
  redis_password = process.env.REDIS_PROD_PASSWORD;
  redis_port = process.env.REDIS_PROD_PORT;

  port = process.env.PORT;
}

module.exports = {
  mysql_url,
  mysql_username,
  mysql_password,
  mysql_port,
  mysql_database,

  redis_url,
  redis_password,
  redis_port,

  aws_s3_bucket_name,
  aws_s3_bucket_region,
  aws_s3_access_key,
  aws_s3_secret_access_key,

  port,
};
