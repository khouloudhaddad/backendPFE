const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const PrioritySchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        color: {
            type: String,
            required: true,
            enum: ['red', 'green', 'yellow', 'grey'],
            default: ['grey']
        },
        
    }
)

module.exports = mongoose.model('Priority', PrioritySchema)