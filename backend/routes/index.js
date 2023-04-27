const Router = require("express").Router;

const router = Router();

router.all("/", (req, res) => {
  res.send("Hello There! Welcome to MyCleanRoom");
});

module.exports = router;
