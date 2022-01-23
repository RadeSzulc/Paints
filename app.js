const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Environment Variables
require("dotenv").config();

// database connnection
mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASS +
    "@gradesmanagement.s8u9a.mongodb.net/" +
    process.env.DB_NAME +
    "?retryWrites=true&w=majority"
);

// express instance
const app = express();

// static directory with photos 
app.use("/uploads", express.static("uploads"));

// route files 
const userRoutes = require("./api/routes/users");
const paintRoutes = require("./api/routes/paints"); 

// logger
app.use(morgan("combined"));

// body parser
app.use(bodyParser.json());

// routes 
app.use("/user", userRoutes);
app.use("/paints", paintRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "NOT FOUND" });
});

module.exports = app;


