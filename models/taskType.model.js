const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const TaskTypeSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        title: {
            type: String,
            required: true,
            enum: ['Production', 'Authorization', 'Leave'],
            default: ['Production']
        },
        
    },
    { timestamps: true }
)

module.exports = mongoose.model('TaskType', TaskTypeSchema)