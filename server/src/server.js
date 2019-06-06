const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("express-cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Hello World to test routes
app.get("/", (req, res) => res.send("Hello World"));

// api routes
app.use("/api", require("./routes"));

const port = 8000;

app.listen(port, () => console.log("Server running..."));
