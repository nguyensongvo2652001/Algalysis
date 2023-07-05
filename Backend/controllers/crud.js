const APIFeatures = require("../utils/apiFeatures");
const { HandledError, catchAsync } = require("../utils/errorHandling");

const getAllWithCondition = (Model) => {
  return catchAsync(async (req, res, next) => {
    const totalNumberOfDocs = await Model.countDocuments(req.body);
    const query = Model.find(req.body);

    if (!req.query.limit) {
      req.query.limit = 10;
    }

    const features = new APIFeatures(query, req.query)
      .sort()
      .paginate()
      .limitFields();

    const docs = await features.query;

    const maxNumberOfPages = Math.ceil(totalNumberOfDocs / req.query.limit);

    const modelName = Model.modelName.toLowerCase();
    const pluralModelName = `${modelName}s`;

    res.status(200).json({
      status: "success",
      data: {
        length: docs.length,
        [pluralModelName]: docs,
        maxNumberOfPages,
      },
    });
  });
};

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    const modelName = Model.modelName.toLowerCase();

    res.status(201).json({
      status: "success",
      data: {
        [modelName]: newDoc,
      },
    });
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();
    const modelName = Model.modelName.toLowerCase();
    const pluralModelName = `${modelName}s`;

    res.status(200).json({
      status: "success",
      data: {
        length: docs.length,
        [pluralModelName]: docs,
      },
    });
  });

const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = req.doc;
    if (!doc) {
      let query = Model.findById(req.params.id);

      req.populateOptions.map((populateOption) => {
        query = query.populate(populateOption);
      });

      doc = await query;
    }

    const modelName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new HandledError(`No ${modelName} found with that id`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        [modelName]: doc,
      },
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const modelName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new HandledError(`No ${modelName} found with that id`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    const modelName = Model.modelName.toLowerCase();

    if (!doc) {
      return next(new HandledError(`No ${modelName} found with that id`, 404));
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  });

const deleteAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.deleteMany(req.body);
    const modelName = Model.modelName.toLowerCase();
    res.status(200).json({
      status: "success",
      data: null,
    });
  });
};

module.exports = {
  createOne,
  getOne,
  getAll,
  getAllWithCondition,
  updateOne,
  deleteOne,
  deleteAll,
};
