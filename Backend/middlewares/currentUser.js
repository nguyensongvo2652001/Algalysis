const prepareGetAllCreatedProblemMiddleware = (req, res, next) => {
  req.body.creator = req.user._id;
  req.query.sort = "-dateCreated";
  next();
};

const prepareDeleteAllCreatedProblems = (req, res, next) => {
  req.body.creator = req.user._id;
  next();
};

module.exports = {
  prepareGetAllCreatedProblemMiddleware,
  prepareDeleteAllCreatedProblems,
};
