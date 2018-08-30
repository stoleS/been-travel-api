const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Visitation Schema for connecting Users with Places
// It contains information about every user visit
// Additionaly, date of visit is added
const visitationSchema = new Schema({
  location: {
    type: Schema.Types.ObjectId,
    ref: "place"
  },
  date: { type: Date, default: Date.now },
  visitor: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

const Visitation = mongoose.model("visitation", visitationSchema);
module.exports = Visitation;
