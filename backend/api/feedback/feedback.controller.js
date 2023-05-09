const Router = require("express").Router;
const validateFeedback = require("./feedback.validation");
const router = Router();
const Feedback = require("../feedback/feedback.model");
const { Student, HKStaff } = require("../user/user.model");
const errors = require("../../utils/errosmessage");
const { extractToken } = require("../../middleware/tokenParser");

router.post(
  "/submit",
  extractToken,
  validateFeedback,
  async (req, res, next) => {
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
        throw err;
      }

      // verify house keeping staff exists with claimed id

      const claimedHKId = await HKStaff.findOne({
        hkId: { $eq: feedback["hkId"] },
      });

      if (!claimedHKId) {
        let err = new Error(errors.BAD_REQUEST);
        throw err;
      }

      // finally save the feedback
      await new Feedback(feedback).save();

      res.json("ok");
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
