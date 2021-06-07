const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    shoppingCartID: {
      type: Schema.Types.ObjectId,
      ref: "shoppingCart",
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    date_of_delivery: { type: Date, required: true },
    credit_card: { type: Number },
  },
  { versionKey: false }
);

const Order_Model = model("order", orderSchema);

module.exports = Order_Model;
