const app = require("../app");
const server = require("../index");
const supertest = require("supertest");
const mongoose = require("mongoose");

beforeEach(() => {
  // timeout of 1 min added so that jest don't exits before DB connection get established
  jest.setTimeout(60000);
});

afterAll(async () => {
  // await mongoose.connection.close();
  server.close();
});

describe("SERVER REACHABILITY TEST", (done) => {
  test("GET /api", (done) => {
    supertest(app).get("/api").send().expect(200).then(done()).catch(done);
  }, 60000);

  test("GET /wrongendpoint", (done) => {
    supertest(app)
      .get("/wrongendpoint")
      .send()
      .expect(404)
      .then(done())
      .catch(done);
    // .then((res) => {
    //   done();
    // })
  }, 60000);
});
