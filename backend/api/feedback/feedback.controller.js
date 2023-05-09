const Router = require("express").Router;
const validateFeedback = require("./feedback.validation");
const router = Router();
const Feedback = require("../feedback/feedback.model");
const { Student, HKStaff, Supervisor } = require("../user/user.model");
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

router.get("/get-feedback/for-today", extractToken, async (req, res, next) => {
  try {
    // verify request is coming from valid supervisor

    const supervisor = await Supervisor.findOne({
      _id: { $eq: req.params["id"] },
    });

    if (!supervisor) throw new Error(errors.BAD_REQUEST);

    // initializing date for comparision

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const data = await Feedback.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/get-feedback/group-monthwise",
  extractToken,
  async (req, res, next) => {
    try {
      const initDate = new Date();
      initDate.setHours(0, 0, 0, 0);
      initDate.setMonth(0);
      initDate.setDate(1);

      const data = await Feedback.aggregate([
        {
          $match: {
            createdAt: { $gt: initDate },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
            avg_rating: { $avg: "$rating" },
          },
        },
      ]);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
);

router.get("/get-feedback/:id", extractToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (new RegExp("^HK[0-9]{4}$").test(id) === false)
      throw new Error(errors.BAD_REQUEST);

    const feedbacks = await Feedback.find(
      { hkId: { $eq: id } },
      {
        rating: 1,
        hkId: 1,
        remarks: 1,
        createdAt: 1,
        student_roll_no: 1,
        student_room_no: 1,
        _id: 0,
      }
    );

    res.json({ feedbacks });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
