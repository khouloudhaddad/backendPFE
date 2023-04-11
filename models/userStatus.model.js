const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userStatusSchema = mongoose.Schema({
  availability: {
    type: String,
    required: true,
    enum: ["available", "unavailable"],
    default: ["available"],
  },
  leave_date: { type: Date,
                required: true,
                default:null },
  return_date: { type: Date, 
                 required: true,
                 default:null },
});

module.exports = mongoose.model("UserStatus", userStatusSchema);
