const Problem = require("../models/problem");
const ProblemAnalyzeResult = require("../models/analyzeResult");
const { catchAsync, HandledError } = require("../utils/errorHandling");
const {
  createOne,
  getAllWithCondition,
  getOne,
  deleteOne,
  deleteAll,
  updateOne,
} = require("./crud");

const createProblemController = createOne(Problem);

const getAllWithConditionProblemController = getAllWithCondition(Problem);

const getProblem = getOne(Problem);

const deleteOneProblem = deleteOne(Problem);

const deleteAllProblems = deleteAll(Problem);

const updateProblem = updateOne(Problem);

const analyzeProblem = catchAsync(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return next(
      new HandledError(`No problems found with id = ${req.params.id}`, 404)
    );
  }

  const analyzeProblemURL = `${process.env.MODEL_BACKEND_BASE_URL}/api/model/analyzeText`;

  const response = await fetch(analyzeProblemURL, {
    method: "POST",
    body: JSON.stringify({ text: problem.text }),
    headers: { "Content-Type": "application/json" },
  });

  const responseContent = await response.json();

  if (responseContent.status !== "success") {
    return next(
      new HandledError("Something went wrong trying to analyze your text", 500)
    );
  }

  const { data } = responseContent;
  const { analyzeResult: responseAnalyzeResult } = data;

  const analyzeResultData = {
    problem: problem._id,
    dateAnalyzed: Date.now(),
    difficulty: responseAnalyzeResult.difficulty,
    complexity: responseAnalyzeResult.complexity,
    tags: responseAnalyzeResult.tags,
    relatedProblems: responseAnalyzeResult["similar_problems"],
  };
  let analyzeResult = await ProblemAnalyzeResult.findOneAndUpdate(
    {
      problem: problem._id,
    },
    analyzeResultData
  );

  if (!analyzeResult) {
    analyzeResult = await ProblemAnalyzeResult.create(analyzeResultData);
    problem.analyzeResult = analyzeResult._id;
    await problem.save();
  }

  res.status(200).json({
    status: "success",
    data: { analyzeResult },
  });
});

module.exports = {
  createProblemController,
  getAllWithConditionProblemController,
  getProblem,
  analyzeProblem,
  deleteOneProblem,
  deleteAllProblems,
  updateProblem,
};
