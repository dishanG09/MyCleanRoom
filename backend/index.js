const app = require("./app");
const logger = require("./config/logger");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 12345;

const server = app.listen(PORT, (err) => {
  if (err) {
    //console.log(err);
  }
  // console.log(`SERVER STARTED ON PORT ${PORT}`);
});

process.on("SIGINT", async () => {
  try {
    await mongoose.disconnect();
    // console.log("DB DISCONNECTED");
    server.close();
    // console.log("SERVER STOPPED");
    process.exit(0);
  } catch (e) {
    // console.log(e);
    process.exit(1);
  }
});

module.exports = server;
