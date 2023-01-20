const redis = require("redis");
const { redis_url, redis_port } = require("./config");

const redisConn = redis.createClient({
  url: `redis://${redis_url}`,
});

exports.default = redisConn;
