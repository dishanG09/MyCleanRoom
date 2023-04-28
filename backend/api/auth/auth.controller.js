const Router = require("express").Router;
const User = require("../user/user.model");
const logger = require("../../config/logger");

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

module.exports = router;
