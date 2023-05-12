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

const supervisorSchema = new Schema(
  {
    supId: { type: Types.String, required: true, unique: true },
    password: { type: Types.String, required: true },
    name: { type: Types.String, required: true },
    gender: { type: Types.String },
    dob: { type: Types.String, required: true },
  },
  { timestamps: true }
);

const studentSchema = new Schema(
  {
    rollNo: { type: Types.String, required: true, unique: true },
    password: { type: Types.String, required: true },
    name: { type: Types.String, required: true },
    gender: { type: Types.String },
    dob: { type: Types.String, required: true },
    roomNo: { type: Types.String, required: true, unique: true },
    reset_password_flag: { type: Types.Boolean, default: false },
  },
  { timestamps: true }
);

const hkStaffSchema = new Schema(
  {
    hkId: { type: Types.String, required: true, unique: true },
    name: { type: Types.String, required: true },
    gender: { type: Types.String },
    dob: { type: Types.String, required: true },
    supId: { type: Types.String, required: true },
    password: { type: Types.String, default: "null" },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
const Supervisor = mongoose.model("Supervisor", supervisorSchema);
const HKStaff = mongoose.model("HKStaff", hkStaffSchema);

module.exports = { Supervisor, Student, HKStaff };
