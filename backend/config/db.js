const mongoose = require("mongoose");
const logger = require("./logger");

require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connection.on("disconnected", (err, _) => {
      if (err) {
        process.env.NODE_ENV !== "TEST" && console.log(err.message);
        throw new Error(err);
      }
    });

    mongoose.connection.on("error", (err, _) => {
      process.env.NODE_ENV !== "TEST" && console.log(err.message);
      throw new Error(err);
    });

    await mongoose.connect(process.env.DB_URI, {
      keepAlive: true,
      dbName: "mcrDB",
    });

    process.env.NODE_ENV !== "TEST" && console.log("DB CONNECTION ESTABLISHED");
  } catch (e) {
    process.env.NODE_ENV !== "TEST" && console.log(e.message);
    throw new Error(e.message);
  }
};

module.exports = { connectDB };
