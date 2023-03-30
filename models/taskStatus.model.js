const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const taskStatusSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        title: {
            type: String,
            required: true,
            enum: ['To Do', 'In Progress', 'QC', 'Done'],
            default: ['To Do']
        },
       
    },
    { timestamps: true }
)

module.exports = mongoose.model('TaskStatus', taskStatusSchema)