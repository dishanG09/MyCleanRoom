const Router = require("express").Router;
const User = require("../user/user.model");
const logger = require("../../config/logger");

const router = Router();

router.post("/add-user", async (req, res) => {
  try {
    let user = new User({
      name: "Dishang",
      dob: "09/02/200",
      gender: "M",
      password: "mypass",
      username: "dishanG09",
    });

    await user.save();
    res.send("user created successfully");
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
});

router.get("/get-users", async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
});

module.exports = router;
