const Place = require("../models/place");
const User = require("../models/user");
const Visitation = require("../models/visitation");

module.exports = {
  // Get all visitations in database
  index: async (req, res, next) => {
    const visitations = await Visitation.find({}).populate(
      "location visitor",
      "_id name _id username"
    );
    res.status(200).json(visitations);
  }
};
