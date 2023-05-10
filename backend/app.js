const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const db = require("./config/db");
const handleUnknowEndPoints = require("./middleware/unknowendpoint");
const globalErrorHandler = require("./middleware/errorHandler");
const logger = require("./config/logger");

// create application object
const app = express();

// db connection request
db.connectDB();

// setting middlewares

// allowing cross origin requests
app.use(cors({ exposedHeaders: ["token"] }));

// json body parser middleware
app.use(express.json());

// log the request

app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info(
      "[method:" +
        req.method +
        "][url:" +
        req["originalUrl"] +
        "][ip:" +
        req.ip +
        "][status:" +
        res.statusCode +
        "]"
    );
  });
  next();
});

// api routes
app.use("/api", routes);

// handling unknonw endpoint
app.use(handleUnknowEndPoints);

//global Error Handler
app.use(globalErrorHandler);

module.exports = app;
