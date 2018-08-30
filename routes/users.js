const router = require("express-promise-router")();

// Import controller for user route requests
const UsersController = require("../controllers/users");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

// Index user route requests
router
  // Access route
  .route("/")
  // Get all users
  .get(UsersController.index)
  // Validate body and add a new user
  .post(validateBody(schemas.userSchema), UsersController.newUser);

// User ID route requests
router
  // Access route
  .route("/:userId")
  // Validate ID param and get user
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUser)
  // Validate and replace values for this user
  .put(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchema)
    ],
    UsersController.replaceUser
  )
  // Validate data and update user
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchemaPatch)
    ],
    UsersController.updateUser
  );

// User visitations requests
router
  // Access route
  .route("/:userId/visited")
  // Validate ID param and get user visitations
  .get(
    validateParam(schemas.idSchema, "userId"),
    UsersController.getUserVisitations
  )
  // Validate ID, place data and add new visitation
  .post(
    [validateParam(schemas.idSchema, "userId")],
    UsersController.addUserVisitation
  );
module.exports = router;
