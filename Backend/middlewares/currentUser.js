const prepareGetAllCreatedProblemMiddleware = (req, res, next) => {
  req.body.creator = req.user._id;
  req.query.sort = "-dateCreated";
  next();
};

module.exports = { prepareGetAllCreatedProblemMiddleware };
