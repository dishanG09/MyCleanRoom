const Router = require("express").Router;
const models = require("../user/user.model");
const { usersValidation } = require("../../middleware/validator");
const errosmessage = require("../../utils/errosmessage");
const { extractToken } = require("../../middleware/tokenParser");
const router = Router();
const Feedback = require("../feedback/feedback.model");

const saveUserData = (data, Model, next) => {
  return new Promise((resolve, reject) => {
    let cnt = 0;
    try {
      if (data.length === 0) resolve();

      data.forEach(async (d) => {
        try {
          await new Model(d).save();
          cnt++;
          if (cnt === data.length) resolve();
        } catch (e) {
          next(e);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

router.post("/add-users/:role", usersValidation, async (req, res, next) => {
  // expect a list of user, with details in JSON format

  const role = req.params["role"];

  // verify given role is

  // can store password in encrypted form...but will store in plaintext as of now
  // not required to store in encrypted

  let User;

  if (role === "supervisor") User = models.Supervisor;
  else if (role === "student") User = models.Student;
  else if (role === "hkstaff") User = models.HKStaff;
  else throw new Error(errosmessage.BAD_REQUEST);

  try {
    const users = req.body["users"];
    await saveUserData(users, User, next);

    res.json("success");
  } catch (e) {
    next(e);
  }
});

router.get("/get-users/hkstaff", extractToken, async (req, res, next) => {
  try {
    // verify supervisor with claimed id does exists

    const supervisor = await models.Supervisor.findOne({
      _id: { $eq: req.headers["id"] },
    });

    if (!supervisor) throw new Error(errosmessage.BAD_REQUEST);

    const hkstaff = await models.HKStaff.find({}, { name: true, hkId: true });

    let stats = await Feedback.aggregate([
      {
        $group: {
          _id: "$hkId",
          feedbackCount: {
            $sum: 1,
          },
          avg_rating: { $avg: "$rating" },
        },
      },
    ]);

    res.json({ stats, hkstaff });
  } catch (err) {
    next(err);
  }
});

router.post("/password-reset/:role", async (req, res, next) => {
  try {
    const { username } = req.body;
    const { role } = req.params;

    if (!username || !role || role !== "student")
      throw new Error(errosmessage.BAD_REQUEST);

    const student = await models.Student.findOne({ rollNo: { $eq: username } });

    if (!student) throw new Error(errosmessage.BAD_REQUEST);

    await models.Student.findOneAndUpdate(
      { rollNo: { $eq: username } },
      { $set: { reset_password_flag: true } }
    );

    res.json({
      message: "password reset request registered...visit system admin",
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/password-reset-request-list",
  extractToken,
  async (req, res, next) => {
    try {
      const list = await models.Student.find(
        {
          reset_password_flag: { $eq: true },
        },
        { name: 1, rollNo: 1, roomNo: 1, dob: 1, gender: 1, _id: 0 }
      );

      res.json({ requests: list });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/submit-new-password", extractToken, async (req, res, next) => {
  try {
    const { newpassword, username } = req.body;

    if (!newpassword || !username || username === "" || newpassword === "")
      throw new Error(errosmessage.BAD_REQUEST);

    const student = await models.Student.findOne({ rollNo: { $eq: username } });

    if (
      !student ||
      !student.reset_password_flag ||
      student.reset_password_flag === false
    )
      throw new Error(errosmessage.BAD_REQUEST);

    await models.Student.findOneAndUpdate(
      { rollNo: { $eq: username } },
      { $set: { password: newpassword, reset_password_flag: false } }
    );

    res.json("ok");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
