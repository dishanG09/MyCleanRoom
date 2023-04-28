const logger = require("../config/logger");
const errors = require("../utils/errosmessage");

const unknowEndPoint = (req, res, next) => {
  try {
    logger.warn(
      `Unknown Endpoint hit [ IP : ${req.ip} ][ URL : ${req["originalUrl"]} ][ USER_AGENT : ${req.headers["user-agent"]} ]`
    );
    next(new Error(errors.API_NOT_FOUND));
  } catch (e) {
    next(new Error(errors.INTERNAL_SERVER_ERROR, { cause: e }));
  }
};

module.exports = unknowEndPoint;
