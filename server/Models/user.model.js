const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, required: true, unique: true },
    id: { type: Number, required: true, unique: true },
    password: { type: String },
    city: String,
    street: String,
    Role: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const Users_Model = model("users", userSchema);

const initUsers = async () => {
  const admin = new Users_Model({
    Role: true,
    _id: "60528c1f6e8b05729c9bff5e",
    first_name: "amdin",
    last_name: "admin",
    email: "admin@gmail.com",
    id: 207331131,
    //admin
    password: "$2b$10$RKaNdq7GaTvBnZoT60qed.qNc/cmhREg/IS.CAFT9ky39hiDvIfEu",
    city: "moddin",
    street: "lehsem",
  });

  await admin.save();

  const oryan = new Users_Model({
    Role: false,
    first_name: "oryan",
    last_name: "baruch",
    email: "oryanb321@gmail.com",
    id: 207331133,
    //hashed oryan
    password: "$2b$10$A3WmEcno2qB2ZSWzibEvAufsTsYm3yvpePvgj4YkOGmH5S4Da7Nce",
    city: "modiin",
    street: "lehsem",
  });

  await oryan.save();
};

module.exports = { Users_Model, initUsers };
