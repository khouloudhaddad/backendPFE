const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      trim: true,
      required: [true, "Please add a message to your comment"],
    },
    //just in case reply to a comment
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "A comment must belong to a task"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
