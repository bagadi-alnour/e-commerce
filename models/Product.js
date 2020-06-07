const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    weight: { type: String },
    quantity: { type: String, required: true },
    imageUrl: { type: [String] },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
