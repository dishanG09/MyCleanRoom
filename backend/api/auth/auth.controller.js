const Router = require("express").Router;
const Student = require("../user/user.model").Student;
const Supervisor = require("../user/user.model").Supervisor;

const logger = require("../../config/logger");
const errors = require("../../utils/errosmessage");

const router = Router();

router.post("/login/:role", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { role } = req.params;

    if (!username || !password || (role !== "student" && role !== "supervisor"))
      throw new Error(errors.BAD_REQUEST);

    let User;

    if (role === "student") {
      User = await Student.findOne({ rollNo: { $eq: username } });
    } else if (role === "supervisor") {
      User = await Supervisor.findOne({ supId: { $eq: username } });
    }

    if (!User || User["password"] !== password)
      throw new Error(errors.UNAUTHORIZED);

    // jwt pending
    res.json("OK");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
