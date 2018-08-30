const router = require("express-promise-router")();

// Import controller for user route requests
const PlacesController = require("../controllers/places");

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
  .get(PlacesController.index)
  // Validate body and add a new place
  .post(validateBody(schemas.placeSchema), PlacesController.newPlace);

// Place ID route requests
router
  // Access route
  .route("/:placeId")
  // Validate ID param and get place
  .get(validateParam(schemas.idSchema, "placeId"), PlacesController.getPlace);

router
  // Access route
  .route("/:placeId/visitors")
  // Validate ID param and get place visitors
  .get(
    validateParam(schemas.idSchema, "placeId"),
    PlacesController.getPlaceVisitors
  );
module.exports = router;
