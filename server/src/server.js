const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("express-cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Hello World to test routes
app.get("/", (req, res) => res.send("Hello World"));

// api routes
app.use("/api", require("./routes"));

// Connect to MongoDB
mongoose.connect("mongodb://mongo:27017/docker-node-mongo", {
  useNewUrlParser: true
});
mongoose.connection.on("error", err => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// models
require("./models/Sheet");

app.listen(port, () => console.log("Server running..."));
