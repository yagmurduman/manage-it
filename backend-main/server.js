const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
global.schemas = require("./api/models/schemas");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authentication = require("./api/middlewares/authentication");
const authorisation = require("./api/middlewares/authorisation");
const routes = require("./api/routes/routes");

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://Team41:${process.env.DATABASE_PASSWORD}@seba.0bnvxao.mongodb.net/ManageIT?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database connection initiated");
  });

const port = process.env.PORT || 3000;
console.log("Port: " + port);
const app = express();
app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
routes(app, authentication.authenticateToken, authorisation.authoriseRequest);
// incorporate error control to server launch
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Server started listening on port", port);
});

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
