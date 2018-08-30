const router = require("express-promise-router")();

// Import controller for user route requests
const VisitationsController = require("../controllers/visitations");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

// Index places route requests
router
  // Access route
  .route("/")
  // Get all places
  .get(VisitationsController.index);

module.exports = router;
