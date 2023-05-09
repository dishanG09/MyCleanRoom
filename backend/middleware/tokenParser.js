const jwt = require("jsonwebtoken");
const env = require("dotenv");
const errosmessage = require("../utils/errosmessage");
env.config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY);
};

const extractToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token) next(new Error(errosmessage.FORBIDDEN));

  const payload = jwt.verify(token, process.env.JWT_KEY);

  req.headers["id"] = payload["id"];

  next();
};

module.exports = { generateToken, extractToken };
