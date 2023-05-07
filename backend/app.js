const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const db = require("./config/db");
const handleUnknowEndPoints = require("./middleware/unknowendpoint");
const globalErrorHandler = require("./middleware/errorHandler");

// create application object
const app = express();

// db connection request
db.connectDB();

// setting middlewares

// allowing cross origin requests
app.use(cors());

// json body parser middleware
app.use(express.json());

// api routes
app.use("/api", routes);

// handling unknonw endpoint
app.use(handleUnknowEndPoints);

//global Error Handler
app.use(globalErrorHandler);

module.exports = app;
