const jwt = require("jsonwebtoken");
require("dotenv").config();

const admin__auth = (req, res, next) => {
  const token=req.headers["xx-auth"]
  jwt.verify(token,
    `${process.env.JWT_SECRET}`,
    (err, payload) => {
      if (err) return res.status(404).json({err});
      req.user = payload._id;
      if(payload.Role==false) return res.send('Only admin can see this page')
      next();
    }
  );
};

module.exports = admin__auth;