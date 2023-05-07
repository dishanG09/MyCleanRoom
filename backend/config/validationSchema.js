const Joi = require("joi");
const error = require("../utils/errosmessage");

// user data validators

// user demographic data validation

const userDataValidation = Joi.object({
  name: Joi.string().min(2).required(),
  gender: Joi.string().length(1).pattern(new RegExp("^[MF]$")).required(),
  dob: Joi.string()
    .pattern(
      new RegExp(
        "^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-([1-9][0-9][0-9][0-9])$"
      )
    )
    .required(),
  password: Joi.string().min(5),
});

// validation of data specific to user
const superVisorValidator = Joi.object({
  supId: Joi.string().pattern(new RegExp("^SUP[0-9]{3}[1-9]$")).required(),
});

const studentDataValidator = Joi.object({
  rollNo: Joi.string()
    .pattern(new RegExp("^(MT|IMT)(201[9-9]|20[2-9][0-9])[0-9]{2}[0-9]$"))
    .required(),
  roomNo: Joi.string().pattern(new RegExp("^[LVB][0-9]{2}[1-9]$")).required(),
});

const hkstaffDataValidator = Joi.object({
  hkId: Joi.string()
    .pattern(new RegExp("^HK(0*[1-9][0-9]{0,3}|[1-9][0-9]{3})$"))
    .required(),
  supId: Joi.string().pattern(new RegExp("^SUP[0-9]{3}[1-9]$")),
});

// returns array of validator schemas

const getValidator = (key) => {
  let res = [];
  if (key === "supervisor") res.push(superVisorValidator);
  else if (key === "student") res.push(studentDataValidator);
  else if (key === "hkstaff") res.push(hkstaffDataValidator);

  if (key !== "feedback") res.push(userDataValidation);

  if (!key || res.length === 0) throw new Error(error.INVALID_VALIDATOR);

  return res;
};

module.exports = getValidator;
