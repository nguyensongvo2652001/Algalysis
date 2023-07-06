const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const problemRoute = require("./routes/problem");
const currentUserRoute = require("./routes/currentUser");

const errorController = require("./controllers/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:3001"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/problem", problemRoute);
app.use("/api/currentUser", currentUserRoute);
app.use(errorController);

module.exports = app;
