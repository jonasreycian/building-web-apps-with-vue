const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const mongo = require("./mongo");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.SERVER_PORT || 8000;
app.use("/", router);

app.listen(port, () => {
  console.log(`⚡App is running on port ${port}⚡`);
});
