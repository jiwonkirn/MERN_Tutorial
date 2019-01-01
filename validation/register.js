import isEmpty from "./is-empty";
const Validator = require("validator");

module.exports = function validateRegisterInput(input) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
