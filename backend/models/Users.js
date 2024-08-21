const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  companyName: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;