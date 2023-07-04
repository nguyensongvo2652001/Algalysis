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
  analyzeResult: {
    type: mongoose.Types.ObjectId,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
