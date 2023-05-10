const Router = require("express").Router;
const Student = require("../user/user.model").Student;
const Supervisor = require("../user/user.model").Supervisor;

const logger = require("../../config/logger");
const { generateToken } = require("../../middleware/tokenParser");
const errors = require("../../utils/errosmessage");

const getUser = (obj, role) => {
  let user = {};

  user["name"] = obj["name"];
  user["dob"] = obj["dob"];
  user["gender"] = obj["gender"];

  if (role === "student") {
    user["student_roll_no"] = obj["rollNo"];
    user["student_room_no"] = obj["roomNo"];
  } else {
    user["supId"] = obj["supId"];
  }

  return user;
};

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

    const token = generateToken({ id: User._id });

    res.json({ token, data: getUser(User, role) });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
