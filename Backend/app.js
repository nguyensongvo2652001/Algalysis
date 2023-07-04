const express = require("express");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const problemRoute = require("./routes/problem");
const currentUserRoute = require("./routes/currentUser");

const errorController = require("./controllers/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/problem", problemRoute);
app.use("/api/currentUser", currentUserRoute);
app.use(errorController);

module.exports = app;
