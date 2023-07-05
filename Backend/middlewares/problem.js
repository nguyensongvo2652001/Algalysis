const { HandledError, catchAsync } = require("../utils/errorHandling");
const { validateRequiredFields } = require("../utils/validator");
const User = require("../models/user");
const ProblemAnalyzeResult = require("../models/analyzeResult");
const Problem = require("../models/problem");

const MAX_PROBLEM_TEXT_LENGTH = 550;

const prepareSearchProblemMiddleware = (req, res, next) => {
  const q = req.query?.q || "";

  const searchQuery = { $regex: q, $options: "i" };

  req.body = {
    text: searchQuery,
    creator: req.user._id,
  };

  next();
};

const setProblemRequestBodyBeforeCreateMiddleware = (req, res, next) => {
  req.body.dateCreated = Date.now();
  req.body.analyzeResult = undefined;
  req.body.creator = req.user._id; // The creator of the problem will be the current logged in user

  next();
};

const validateProblemRequestBodyMiddleware = catchAsync(
  async (req, res, next) => {
    const problemRequestBody = req.body;
    validateRequiredFields(problemRequestBody, ["creator", "text"]);

    if (problemRequestBody.text.length > MAX_PROBLEM_TEXT_LENGTH) {
      return next(
        new HandledError(
          `Problem can not be longer than ${MAX_PROBLEM_TEXT_LENGTH} characters`
        )
      );
    }

    const user = await User.findById(problemRequestBody.creator);
    if (!user) {
      return next(
        new HandledError(
          `No users found with id = ${problemRequestBody.creator}`,
          404
        )
      );
    }

    const { analyzeResult: analyzeResultID } = problemRequestBody;
    if (analyzeResultID) {
      const ananlyzeResult = await ProblemAnalyzeResult.findById(
        analyzeResultID
      );
      if (!ananlyzeResult) {
        return next(
          new HandledError(
            `No analyze result found with id = ${analyzeResultID}`,
            404
          )
        );
      }
    }

    next();
  }
);

const validateIfUserIsAllowedToViewProblemMiddleware = catchAsync(
  async (req, res, next) => {
    const problem = await Problem.findById(req.params.id).populate({
      path: "analyzeResult",
    });

    if (!problem) {
      return next(
        new HandledError(`No problem found with id = ${req.params.id}`, 404)
      );
    }

    if (!problem.creator._id.equals(req.user._id)) {
      return next(
        new HandledError("You are not allowed to view this problem", 403)
      );
    }

    // We need to save the problem so we don't have to query for it again in the controller
    req.doc = problem;

    next();
  }
);

module.exports = {
  setProblemRequestBodyBeforeCreateMiddleware,
  validateProblemRequestBodyMiddleware,
  validateIfUserIsAllowedToViewProblemMiddleware,
  prepareSearchProblemMiddleware,
};
