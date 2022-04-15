const mongoose = require("mongoose");

const foodList = mongoose.Schema({
  email: { type: String, require: true },
  drink: { type: String, require: true },
});

module.exports = mongoose.model("foodList", foodList);
