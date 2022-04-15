const mongoose = require("mongoose");

const userData = mongoose.Schema({
  email: { type: String, require: true },
  date: { type: Date, require: true },
  gender: { type: String, require: true },
  fever: { type: String, require: true },
  chBox: { type: Array, require: true },
  img: { type: String, require: true },
  role: { type: String, require: true, default: "user" },
});

module.exports = mongoose.model("UserForm", userData);
