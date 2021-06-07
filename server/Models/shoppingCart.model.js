const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    product: { type: Schema.Types.ObjectId, ref: "product" },
  },
  { versionKey: false }
);

const shoppingCart_Model = model("shoppingCart", shoppingCartSchema);

module.exports = shoppingCart_Model;
