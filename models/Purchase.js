const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  weight: { type: String },
  imageUrl: { type: [String] },
  purchasedAt: { type: Date, default: Date.now },
});
const Purchase = mongoose.model("purchase", PurchaseSchema);

module.exports = Purchase;
