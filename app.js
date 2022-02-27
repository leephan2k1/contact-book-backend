require("dotenv").config();
const express = require("express");
const cors = require("cors");
const setupContactRoutes = require("./app/routes/contact.routes");
const { BadRequestError, errorHandler } = require("./app/error");

const app = express();

//enable all CORS requests
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

setupContactRoutes(app);

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to contact book application.",
  });
});

app.use((req, res, next) => {
  return next(new BadRequestError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  errorHandler.handleError(err, res);
})


module.exports = app;
