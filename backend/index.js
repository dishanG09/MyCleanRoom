const app = require("./app");
const logger = require("./config/logger");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 6666;

const server = app.listen(PORT, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`SERVER STARTED ON PORT ${PORT}`);
});

process.on("SIGINT", async () => {
  try {
    await mongoose.disconnect();
    logger.info("DB DISCONNECTED");
    server.close();
    logger.info("SERVER STOPPED");
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
});

module.exports = server;
