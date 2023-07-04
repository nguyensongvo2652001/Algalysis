const mongoose = require("mongoose");

// difficulty, complexity, tags, related problems
const problemAnalyzeResultSchema = new mongoose.Schema({
  problem: {
    type: mongoose.Types.ObjectId,
  },
  dateAnalyzed: {
    type: Date,
  },
  difficulty: {
    type: String,
  },
  complexity: {
    type: String,
  },
  tags: [
    {
      label: {
        type: String,
      },
      prob: {
        type: Number,
      },
    },
  ],
  relatedProblems: [
    {
      name: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
});

const ProblemAnalyzeResult = mongoose.model(
  "ProblemAnalyzeResult",
  problemAnalyzeResultSchema
);

module.exports = ProblemAnalyzeResult;
