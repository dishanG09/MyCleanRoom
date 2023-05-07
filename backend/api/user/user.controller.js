const Router = require("express").Router;
const models = require("../user/user.model");
const { usersValidation } = require("../../middleware/validator");
const errosmessage = require("../../utils/errosmessage");

const router = Router();

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

module.exports = router;
