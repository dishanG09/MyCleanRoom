const Router = require("express").Router;
const User = require("../user/user.model");
const logger = require("../../config/logger");

const router = Router();

router.post("/add-user", async (req, res, next) => {
  try {
    let user = new User({
      name: "Dishang",
      dob: "09/02/200",
      gender: "M",
      password: "mypass",
      username: "dishanG09",
    });

    await user.save();
    return res.send("user created successfully");
  } catch (e) {
    next(e);
  }
});

router.get("/get-users", async (req, res, next) => {
  try {
    throw new Error("WILL NOT SEND");
    let users = await User.find({});
    return res.json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
