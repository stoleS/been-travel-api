const Joi = require("joi");

module.exports = {
  // ID parameter validation
  // We need to provide schema to compare against
  // And the name of the param to be checked
  validateParam: (schema, name) => {
    return (req, res, next) => {
      // Result of validation
      const result = Joi.validate({ param: req["params"][name] }, schema);
      // Check if there were some errors
      if (result.error) {
        // Error happened
        return res.status(400).json(result.error);
      } else {
        // No errors, send result to controller
        if (!req.value) {
          req.value = {};
        }
        if (!req.value["params"]) {
          req.value["params"] = {};
        }
        req.value["params"][name] = result.value.param;
        next();
      }
    };
  },

  // Body param validation
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value["body"]) {
          req.value["body"] = {};
        }
        req.value["body"] = result.value;
        next();
      }
    };
  },

  // Joi schemas
  schemas: {
    // Schema for ID validation
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }),

    // Schema for user values validation
    userSchema: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }),

    // Schema for user data update
    // As patch updates one or more values
    // We don't need to require all of them
    userSchemaPatch: Joi.object().keys({
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
    }),

    placeSchema: Joi.object().keys({
      name: Joi.string().required()
    })
  }
};
