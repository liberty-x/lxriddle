var redis = require("redis");
module.exports = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
