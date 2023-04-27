const express = require("express");
const cors = require("cors");

const db = require("./config/db");

// application object created
const app = express();

//
db.connectDB();

// setting middlewares
app.use(cors());

module.exports = app;
