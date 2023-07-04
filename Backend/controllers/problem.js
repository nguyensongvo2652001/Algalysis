const Problem = require("../models/problem");
const { createOne, getAllWithCondition, getOne } = require("./crud");

const createProblemController = createOne(Problem);

const getAllWithConditionProblemController = getAllWithCondition(Problem);

const getProblem = getOne(Problem);

module.exports = {
  createProblemController,
  getAllWithConditionProblemController,
  getProblem,
};
