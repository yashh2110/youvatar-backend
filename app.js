const express = require("express");
const routes = require("./routes");
var morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/", routes);

module.exports = app;
