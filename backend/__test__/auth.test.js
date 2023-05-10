const app = require("../app");
const server = require("../index");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { Supervisor, Student } = require("../api/user/user.model");
const httpStatus = require("http-status");

const student = {
  rollNo: "MT2022039",
  roomNo: "B576",
  name: "Dishang Patel",
  dob: "09-02-2000",
  gender: "M",
  password: "mypassword",
};

const supervisor = {
  supId: "SUP111",
  password: "superpassword",
  name: "Hanumanth BSK",
  dob: "01-05-1985",
  gender: "M",
};

beforeEach(() => {
  // timeout of 1 min added so that jest
  // don't exits before DB connection get established
  jest.setTimeout(60000);
});

afterAll(async () => {
  // delete users that we created for testing purpose
  await Student.deleteOne({ rollNo: { $eq: student.rollNo } });
  await mongoose.connection.close();
  server.close();
});

describe("AUTHENTICATION ENDPOINT TESTING", () => {
  // creating users for testing

  test("POST /api/auth/login/[role:student]", async () => {
    await new Student(student).save();

    supertest(app)
      .post("/api/auth/login/student")
      .send({
        username: student.rollNo,
        password: student.password,
      })
      .expect(httpStatus.BAD_GATEWAY)
      .end((err) => {});
  }, 60000);
});
