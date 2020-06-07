const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //Get token from the header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No toekn, Authoruzation denied" });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, require("../config/keys").jwt_secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
