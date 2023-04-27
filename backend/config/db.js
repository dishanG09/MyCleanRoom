const mongoose = require("mongoose");
const logger = require("./logger");

require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connection.on("disconnected", (err, _) => {
      if (err) {
        logger.error(err);
        throw new Error(err);
      }
    });

    mongoose.connection.on("error", (err, _) => {
      logger.error(new Error(err));
      throw new Error(err);
    });

    await mongoose.connect(process.env.DB_URI, {
      autoIndex: false,
      keepAlive: true,
    });

    logger.info("DB CONNECTION ESTABLISHED");
  } catch (e) {
    logger.error(e);
    throw new Error(e.message);
  }
};

module.exports = { connectDB };
