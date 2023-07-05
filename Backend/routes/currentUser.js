const express = require("express");

const authMiddleware = require("../middlewares/auth");
const currentUserMiddleware = require("../middlewares/currentUser");
const problemMiddleware = require("../middlewares/problem");

const problemController = require("../controllers/problem");

const router = express.Router();

router.use(authMiddleware.checkAuthenticationMiddleware);

router
  .route("/problem")
  .get(
    currentUserMiddleware.prepareGetAllCreatedProblemMiddleware,
    problemController.getAllWithConditionProblemController
  )
  .delete(
    currentUserMiddleware.prepareDeleteAllCreatedProblems,
    problemController.deleteAllProblems
  );

router.get(
  "/problem/search",
  problemMiddleware.prepareSearchProblemMiddleware,
  problemController.getAllWithConditionProblemController
);

module.exports = router;
