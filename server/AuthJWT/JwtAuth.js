const jwt = require("jsonwebtoken");
require("dotenv").config();


const user__auth = (req, res, next) => {
  const token=req.headers["xx-auth"]
  if (!token) return res.json('Token must be provied')
  jwt.verify(
    token,
    `${process.env.JWT_SECRET}`,
    (err, payload) => {
      if (err) return res.status(401).json({ msg: "Only users can see this page." ,err });
        req.user = payload._id;
         return next();
      }
  );
};

module.exports = user__auth;
