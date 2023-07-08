// Problem: creator, dateCreated, difficulty, complexity, tag, text
const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
  },
  dateCreated: {
    type: Date,
  },
  text: {
    type: String,
  },
  name: {
    type: String,
  },
  analyzeResult: {
    type: mongoose.Types.ObjectId,
    ref: "ProblemAnalyzeResult",
  },
});

const deleteProblemCascade = async (problemId) => {
  await mongoose.model("ProblemAnalyzeResult").findOneAndDelete({
    problem: problemId,
  });
};

problemSchema.pre("findOneAndDelete", async function (next) {
  const query = this.getQuery();
  const problemId = query._id;

  await deleteProblemCascade(problemId);

  next();
});

problemSchema.pre("deleteMany", async function (next) {
  const query = this.getQuery();
  const problems = await Problem.find(query);

  const problemsDeleteCascadePromises = problems.map(async (problem) => {
    await deleteProblemCascade(problem._id);
  });
  await Promise.all(problemsDeleteCascadePromises);

  next();
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
