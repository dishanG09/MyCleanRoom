const Joi = require("joi");

const feedbackSchema = Joi.object({
  hkId: Joi.string().pattern(new RegExp("^HK[0-9]{4}$")).required(),
  student_roll_no: Joi.string()
    .pattern(new RegExp("^(MT|IMT)(201[9-9]|20[2-9][0-9])[0-9]{2}[0-9]$"))
    .required(),
  student_room_no: Joi.string()
    .pattern(new RegExp("^[LVB][0-9]{2}[0-9]$"))
    .required(),
  rating: Joi.number().min(0).max(5).required(),
  remarks: Joi.string().allow(""),
});

const validateFeedBack = (req, res, next) => {
  try {
    const { error } = feedbackSchema.validate(req.body["feedback"]);
    if (error) next(error);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = validateFeedBack;
