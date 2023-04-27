const app = require("../app");
const server = require("../index");
const supertest = require("supertest");
const mongoose = require("mongoose");

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

describe("SERVER REACHABILITY TEST", () => {
  test("GET /api", (done) => {
    supertest(app)
      .get("/api")
      .send()
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  test("GET /wrongendpoint", (done) => {
    supertest(app)
      .get("/wrongendpoint")
      .send()
      .expect(404)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  test("GET /api/user/get-users", (done) => {
    supertest(app)
      .get("/api/user/get-users")
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(10);
        done();
      })
      .catch(done);
  });
});
