const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;

const feedbackSchema = new Schema(
  {
    hkId: { type: Types.String, required: true },
    student_roll_no: { type: Types.String, required: true },
    student_room_no: { type: Types.String, required: true },
    rating: { types: Types.Number, required: true, min: 0, max: 5 },
    remarks: { types: Types.String },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
