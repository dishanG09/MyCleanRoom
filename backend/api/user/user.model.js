const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Types } = Schema;

const userSchema = new Schema({
  name: { type: Types.String, required: true, min: 5 },
  dob: { type: Types.Date, required: true },
  gender: { type: Types.String, required: true },
  username: { type: Types.String, required: true },
  password: { type: Types.String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
