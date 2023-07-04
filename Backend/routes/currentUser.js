const express = require("express");

const authMiddleware = require("../middlewares/auth");
const currentUserMiddleware = require("../middlewares/currentUser");
const problemMiddleware = require("../middlewares/problem");

const problemController = require("../controllers/problem");

const router = express.Router();

router.use(authMiddleware.checkAuthenticationMiddleware);

router.get(
  "/problem",
  currentUserMiddleware.prepareGetAllCreatedProblemMiddleware,
  problemController.getAllWithConditionProblemController
);

router.get(
  "/problem/search",
  problemMiddleware.prepareSearchProblemMiddleware,
  problemController.getAllWithConditionProblemController
);

module.exports = router;
