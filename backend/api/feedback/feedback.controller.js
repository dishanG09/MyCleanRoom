const Router = require("express").Router;
const validateFeedback = require("./feedback.validation");
const router = Router();
const Feedback = require("../feedback/feedback.model");
const { Student } = require("../user/user.model");
const errors = require("../../utils/errosmessage");

router.post("/submit", validateFeedback, async (req, res, next) => {
  try {
    const feedback = req.body["feedback"];

    // validate that room no. and student roll no. match in student database

    const student = await Student.findOne({
      $and: [
        { rollNo: { $eq: feedback["student_roll_no"] } },
        { roomNo: { $eq: feedback["student_room_no"] } },
      ],
    });

    if (!student) {
      let err = new Error(errors.BAD_REQUEST);
      next(err);
    }

    await new Feedback(feedback).save();
    res.json();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
