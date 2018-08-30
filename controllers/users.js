// Import User model
const User = require("../models/user");
const Visitation = require("../models/visitation");
const Place = require("../models/place");

module.exports = {
  // Get all the users in database
  index: async (req, res, next) => {
    const users = await User.find({});
    // Return found users as json
    res.status(200).json(users);
  },

  // Create a new user
  newUser: async (req, res, next) => {
    // Make a new User from body data
    const newUser = new User(req.value.body);
    // Save the user to database
    const user = await newUser.save();
    // Return saved user as response
    res.status(201).json(user);
  },

  // Get user with provided ID
  getUser: async (req, res, next) => {
    // Get user ID after validation
    const { userId } = req.value.params;
    // Search for the user ID in database
    const user = await User.findById(userId);
    // Return user as response
    res.status(200).json(user);
  },

  // Replace all user data
  replaceUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const newUser = req.value.body;
    // Find user in database and replace it's data
    await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  // Update user data
  updateUser: async (req, res, next) => {
    const { userId } = req.value.params;
    const newUserData = req.value.body;
    await User.findByIdAndUpdate(userId, newUserData);
    res.status(200).json({ success: true });
  },

  // Get visited places for specific user
  getUserVisitations: async (req, res, next) => {
    const { userId } = req.value.params;
    const user = await User.findById(userId).populate("visited");
    res.status(200).json(user.visited);
  },

  // Add visitation to user's list
  addUserVisitation: async (req, res, next) => {
    // Get user ID and place ID
    const { userId } = req.value.params;
    const { placeId } = req.body;
    // Find both in database
    const user = await User.findById(userId);
    const place = await Place.findById(placeId);
    // If place doesn't exist return error
    if (!place) {
      res.status(400).json("No place found...");
    } else {
      // If it does, add it in database alongside user
      const newVisitation = new Visitation({
        location: place,
        visitor: user
      });
      user.visited.push(place);
      place.visitors.push(user);
      await place.save();
      await user.save();
      await newVisitation.save();
      res.status(201).json(newVisitation);
    }
  }
};
