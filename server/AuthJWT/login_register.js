const router = require("express").Router();
const {Users_Model} = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//get the user without pass
function _objectWithoutProperties(user, keys) {
  var target = {};
  for (var i in user) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(user, i)) continue;
    target[i] = user[i];
  }
  return target;
}

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const invalidMessage = "Invalid email/password";

    const user = await Users_Model.findOne({ email }).lean();
    if (!user)
      return res.status(500).json({ status: "Erorr", error: invalidMessage });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(500).json({ status: "Erorr", error: invalidMessage });

    const userWithoutPass = _objectWithoutProperties(user, ["password"]);
    const access_token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        ...userWithoutPass,
      },
      `${process.env.JWT_SECRET}`
    );
    return res.status(200).json({ status: "ok", access_token: access_token });
  } catch (error) {
    console.log({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetch_all_users = await Users_Model.find();
    res.json(fetch_all_users);
  } catch (error) {
    console.log({ error });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const fetch_user_by_email = await Users_Model.findOne({ email });
    res.status(200).json(fetch_user_by_email);
  } catch (error) {
    console.log({ error });
  }
});

router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    id,
    password: plainTextPassword,
    confirm_password,
    city,
    street,
  } = req.body;
  if (!email)
    return res.status(500).json({
      error: "Invalid email",
    });

  const password = await bcrypt.hash(plainTextPassword, 10);
  if (plainTextPassword != confirm_password)
    return res.status(500).send({ error: "Password dosnt match." });
  try {
    const created_user = await Users_Model.create({
      first_name,
      last_name,
      email,
      id,
      password,
      city,
      street,
    });
    res.send({ "User registered succesfully": created_user });
  } catch (error) {
    if (error.code == 11000)
      return res.status(418).json({
        status: "Error",
        error: "Email / ID alreaday in use.",
      });
    console.log({ error });
  }
});


module.exports = router;
