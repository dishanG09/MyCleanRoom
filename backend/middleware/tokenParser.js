const jwt = require("jsonwebtoken");
const env = require("dotenv");
const errosmessage = require("../utils/errosmessage");
const { Student, Supervisor } = require("../api/user/user.model");
env.config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY);
};

const extractToken = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) next(new Error(errosmessage.FORBIDDEN));

    const payload = jwt.verify(token, process.env.JWT_KEY);

    req.headers["id"] = payload["id"];
    const role = payload["role"];

    let user = null;

    if (role === "student") {
      user = await Student.findOne({ _id: { $eq: payload["id"] } });
    } else if (role === "supervisor") {
      user = await Supervisor.findOne({ _id: { $eq: payload["id"] } });
    } else throw new Error(errosmessage.FORBIDDEN);

    if (!user) throw new Error(errosmessage.FORBIDDEN);

    if (role === "student" && req["originalUrl"] !== "/api/feedback/submit")
      throw new Error(errosmessage.FORBIDDEN);

    if (role === "supervisor" && req["originalUrl"] === "/api/feedback/submit")
      throw new Error(errosmessage.FORBIDDEN);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { generateToken, extractToken };
