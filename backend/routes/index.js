const Router = require("express").Router;
const userAPI = require("../api/user/user.controller");
const router = Router();

router.get("/", (req, res, next) => {
  try {
    return res.send("OK");
  } catch (e) {
    next(e);
  }
});

router.use("/user", userAPI);

module.exports = router;
