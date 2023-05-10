const app = require("../app");
const server = require("../index");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { Supervisor, Student } = require("../api/user/user.model");
const Feedback = require("../api/feedback/feedback.model");
const httpStatus = require("http-status");

const feedback = {
  hkId: "HK009",
  student_roll_no: "MT2021015",
  student_room_no: "B305",
  rating: 4,
  remarks: "please improve mopping",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTc5YzU4MzU3YmIzZTZiY2I2ZWY1OSIsImlhdCI6MTY4MzY4NjE1Mn0.Gkj9Gnl0acfTosHpqZBMYxI7TbI4S-6SDT3IND8ecxU";

beforeEach(() => {
  // timeout of 1 min added so that jest
  // don't exits before DB connection get established
  jest.setTimeout(60000);
});

afterAll(async () => {
  // delete users that we created for testing purpose
  await Feedback.deleteOne({
    student_roll_no: { $eq: feedback.student_roll_no },
  });
  await mongoose.connection.close();
  server.close();
});

describe("Feedback submission testing", () => {
  // creating users for testing

  test("POST /api/feedback/submit", async () => {
    supertest(app)
      .post("/api/feedback/submit")
      .set("token", token)
      .send({
        feedback,
      })
      .expect(httpStatus.OK)
      .end((err) => {});
  }, 60000);
});
