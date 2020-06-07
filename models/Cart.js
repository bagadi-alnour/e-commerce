const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    quantity: { type: Number },
    weight: { type: String },
    imageUrl: { type: [String] },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("cart", CartSchema);

module.exports = Cart;
