const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  // Collect the jwt access token from the request header
  const authHeader = req.headers["authentication"];
  const token = authHeader;
  console.log("A request arrived with token", token);
  if (token == null) return res.sendStatus(401); // if there isn't any token (also to cover for potential undefined)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};
