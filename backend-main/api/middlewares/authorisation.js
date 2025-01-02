const jwt = require("jsonwebtoken");

exports.authoriseRequest = (req, res, next) => {
  //Build permissions here
  next();
};
