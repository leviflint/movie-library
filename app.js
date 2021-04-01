const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//Import Routes
const postsRoute = require("./routes/posts");

//Middlewares - function that executes when routes are being hit
// app.use(cors());
// app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
  );
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", postsRoute);

//Home Route
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database.");
  }
);

//Boot server
app.listen(process.env.PORT || 3000);
