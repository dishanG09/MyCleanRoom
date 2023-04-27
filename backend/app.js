const express = require("express");
const cors = require("cors");
const api = require("./routes/index");
const db = require("./config/db");
const unknowEndPoint = require("./middleware/unknowendpoint");

// create application object
const app = express();

// db connection request
db.connectDB();

// setting middlewares
app.use(cors());
app.use("/api", api);

// handling unknonw endpoint
app.use(unknowEndPoint);

module.exports = app;
