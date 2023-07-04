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
  .get(
    problemMiddleware.validateIfUserIsAllowedToViewProblemMiddleware,
    problemController.getProblem
  );

module.exports = router;
