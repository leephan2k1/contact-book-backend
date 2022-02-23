require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

//enable all CORS requests
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to contact book application.",
  });
});

module.exports = app;
