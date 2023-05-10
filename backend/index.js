const app = require("./app");
const logger = require("./config/logger");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 12345;

const server = app.listen(PORT, (err) => {
  if (err) {
    process.env.NODE_ENV !== "TEST" && console.log(err);
  }
  process.env.NODE_ENV !== "TEST" &&
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});

process.on("SIGINT", async () => {
  try {
    await mongoose.disconnect();
    process.env.NODE_ENV !== "TEST" && console.log("DB DISCONNECTED");
    server.close();
    process.env.NODE_ENV !== "TEST" && console.log("SERVER STOPPED");
    process.exit(0);
  } catch (e) {
    process.env.NODE_ENV !== "TEST" && console.log(e);
    process.exit(1);
  }
});

module.exports = server;
