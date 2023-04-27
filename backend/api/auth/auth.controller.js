const Router = require("express").Router;
const User = require("../user/user.model");
const logger = require("../../config/logger");

const router = Router();

router.post("/login", async (req, res) => {
  try {
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
});

module.exports = router;
