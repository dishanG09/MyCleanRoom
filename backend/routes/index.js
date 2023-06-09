const Router = require("express").Router;
const userAPI = require("../api/user/user.controller");
const feedbackAPI = require("../api/feedback/feedback.controller");
const authAPI = require("../api/auth/auth.controller");
const router = Router();

router.get("/", (req, res, next) => {
  try {
    return res.send("OK");
  } catch (e) {
    next(e);
  }
});

router.use("/user", userAPI);
router.use("/feedback", feedbackAPI);
router.use("/auth", authAPI);

module.exports = router;
