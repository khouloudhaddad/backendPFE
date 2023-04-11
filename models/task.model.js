const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require('./user.model');
const Comment = require('./comment.model');
const TaskType = require('./taskType.model');
const TaskStatus = require('./taskStatus.model');

const TaskSchema = mongoose.Schema({
  //_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true, "Please add a task Title"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please add a task Description"],
    maxlength: 2000,
  },
  type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskType',
    required: [true, 'Task must have to a type']
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  taskStatus_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskStatus',
  },
  progress:{
    type: Number,
    default: "25"
  }  
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
