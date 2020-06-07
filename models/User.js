const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    address: {
      country: { type: String },
      state: { type: String },
      city: { type: String },
      address: { type: String },
      code: { type: String },
      phone: { type: Number },
    },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", UserSchema);

module.exports = User;
