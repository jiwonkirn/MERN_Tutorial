const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEduInput(data) {
  const errors = {};

  !isEmpty(data.school) ? data.school : "";
  !isEmpty(data.degree) ? data.degree : "";
  !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
    res.status(404).json(errors);
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of stydy is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
