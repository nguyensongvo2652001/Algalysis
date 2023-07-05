const express = require("express");

const authMiddleware = require("../middlewares/auth");
const problemMiddleware = require("../middlewares/problem");

const problemController = require("../controllers/problem");

const router = express.Router();

router.use(authMiddleware.checkAuthenticationMiddleware);

router
  .route("/")
  .post(
    problemMiddleware.setProblemRequestBodyBeforeCreateMiddleware,
    problemMiddleware.validateProblemRequestBodyMiddleware,
    problemController.createProblemController
  );

router
  .route("/:id")
  .all(problemMiddleware.validateIfUserIsAllowedToViewProblemMiddleware)
  .get(problemController.getProblem)
  .delete(problemController.deleteOneProblem);

router.post(
  "/:id/analyze",
  problemMiddleware.validateIfUserIsAllowedToViewProblemMiddleware,
  problemController.analyzeProblem
);

module.exports = router;
