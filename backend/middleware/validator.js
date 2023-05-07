const errors = require("../utils/errosmessage");
const getValidtor = require("../config/validationSchema");

const usersValidation = (req, res, next) => {
  try {
    const data = req.body["users"];

    const key = req.params["role"];

    const validtor = getValidtor(key);

    data.forEach((d) => {
      // role specific validation

      let roleSpecificData = undefined;

      if (key === "student") {
        roleSpecificData = { rollNo: d["rollNo"], roomNo: d["roomNo"] };
      } else if (key === "hkstaff") {
        roleSpecificData = { supId: d["supId"], hkId: d["hkId"] };
      } else if (key === "supervisor") {
        roleSpecificData = { supId: d["supId"] };
      }

      let { error: error1 } = validtor[0].validate(roleSpecificData);

      // general demographic data validation
      let { error: error2 } = validtor[1].validate({
        name: d["name"],
        gender: d["gender"],
        dob: d["dob"],
        password: d["password"],
      });

      if (error1 || error2) throw new Error(errors.DATA_VALIDATION_ERROR);
    });
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { usersValidation };
