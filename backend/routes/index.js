const Router = require("express").Router;
const userAPI = require("../api/user/user.controller");
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello There! Welcome to MyCleanRoom");
});

router.use("/user", userAPI);

module.exports = router;
