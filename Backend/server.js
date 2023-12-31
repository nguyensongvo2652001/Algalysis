const dotenv = require("dotenv");
dotenv.config({ path: "./env/main.env" });

const { connectDB } = require("./utils/db");

process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught Exception Caught");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

let uri = process.env.DB_STRING;
uri = uri.replace(/<password>/, process.env.DB_PASSWORD);
uri = uri.replace(/<databaseName>/, process.env.DB_NAME);
connectDB(uri);

const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("SERVER STARTED");
});
