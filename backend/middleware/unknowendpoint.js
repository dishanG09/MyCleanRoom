const logger = require("../config/logger");
const unknowEndPoint = (req, res, next) => {
  logger.warn(
    `Unknown Endpoint hit [ IP : ${req.ip} ][ USER_AGENT : ${req.headers["user-agent"]} ]`
  );
  res.status(404).send();
};

module.exports = unknowEndPoint;
