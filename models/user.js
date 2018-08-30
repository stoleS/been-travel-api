const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define User schema
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  visited: [
    {
      type: Schema.Types.ObjectId,
      ref: "visitation"
    }
  ]
});

const User = mongoose.model("user", userSchema);
module.exports = User;
