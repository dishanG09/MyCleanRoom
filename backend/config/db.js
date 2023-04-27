const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.DB_URI, {
    autoIndex: false,
    keepAlive: true,
  });
} catch (e) {
  console.error(e);
  throw new Error(e.message);
}

mongoose.connection.on("disconnected", (err, _) => {
  if (err) {
    console.error(err);
    throw new Error(err);
  }
});

mongoose.connection.on("error", (err, _) => {
  console.error(err);
  throw new Error(err);
});
