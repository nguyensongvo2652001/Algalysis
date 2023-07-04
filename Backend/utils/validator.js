const { HandledError } = require("./errorHandling");

const validateRequiredFields = (data, requiredFields) => {
  requiredFields.map((field) => {
    if (data[field]) return;
    throw new HandledError(`${field} can not be empty`, 400);
  });
};

module.exports = { validateRequiredFields };
