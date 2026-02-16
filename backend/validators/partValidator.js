const { body, validationResult } = require("express-validator");

// Validate Add Part
exports.validateAddPart = [
  body("partName")
    .notEmpty()
    .withMessage("Part name is required"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  body("minimumLevel")
    .isInt({ min: 0 })
    .withMessage("Minimum level must be a non-negative integer"),

  body("unitPrice")
    .isFloat({ min: 0 })
    .withMessage("Unit price must be a positive number"),
];

// Validate Add Stock
exports.validateAddStock = [
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Added quantity must be greater than 0"),
];

// Validate Remove Stock
exports.validateRemoveStock = [
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Removed quantity must be greater than 0"),

  body("reason")
    .notEmpty()
    .withMessage("Reason is required"),
];

// Middleware to Handle Validation Errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};
