const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Schema for every place that is added
const placeSchema = new Schema({
  name: String,
  visitors: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]
});

const Place = mongoose.model("place", placeSchema);
module.exports = Place;
