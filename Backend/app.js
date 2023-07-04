const express = require("express");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const errorController = require("./controllers/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use(errorController);

module.exports = app;
