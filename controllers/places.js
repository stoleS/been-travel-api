const Place = require("../models/place");
const User = require("../models/user");
const Visitation = require("../models/visitation");

module.exports = {
  // Get all places in database
  index: async (req, res, next) => {
    const places = await Place.find({});
    res.status(200).json(places);
  },

  newPlace: async (req, res, next) => {
    const newPlace = new Place(req.value.body);
    const place = await newPlace.save();
    res.status(201).json(place);
  },

  getPlace: async (req, res, next) => {
    const { placeId } = req.value.params;
    const place = await Place.findById(placeId);
    res.status(200).json(place);
  },

  getPlaceVisitors: async (req, res, next) => {
    const { placeId } = req.value.params;
    const place = await Place.findById(placeId).populate("visitors");
    res.status(200).json(place.visitors);
  }
};
