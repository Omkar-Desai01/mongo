const express = require("express");
const api = require("./Paths/api");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = express();
var morgan = require("morgan");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((config) => {
    console.log("Database connected");
  });

const testSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
});

const Test = mongoose.model("Test", testSchema);

const testData2 = new Test({
  name: "test2",
  age: 18,
});

testData2
  .save()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use((req, res, next) => {
  res.requestTime = new Date().toISOString();
  next();
});

app.use(api);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the home page",
    requestTime: res.requestTime,
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
