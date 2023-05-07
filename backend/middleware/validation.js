const Joi = require("joi");

// user data validators

// supervisor data validation

const userData = Joi.object({
  name: Joi.string().min(2).required(),
  gender: Joi.string().length(1).pattern("^[MF]$").required(),
  dob: Joi.string()
    .pattern("^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(d{4})$")
    .required(),
  password: Joi.string().min(5),
});

const superVisorValidator = Joi.object({
  supId: Joi.string().pattern("^SUP[0-9]{3}[1-9]$").required(),
});

const studentDataValidator = Joi.object({
  rollNo: Joi.string()
    .pattern("^(MT|IMT)(201[9-9]|20[2-9][0-9])[0-9]{2}[1-9]$")
    .required(),
  roomNo: Joi.string().pattern("^[LVB][0-9]{2}[1-9]$").require(),
});

const hkstaffDataValidator = Joi.object({
  hkId: Joi.string()
    .pattern("^HK(0*[1-9][0-9]{0,3}|[1-9][0-9]{3})$")
    .required(),
  supId: Joi.string().pattern("^SUP[0-9]{3}[1-9]$"),
});

module.exports = {
  userData,
  hkstaffDataValidator,
  studentDataValidator,
  superVisorValidator,
};
