const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const fileSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        url: {
            type: String,
            required: false,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        task_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        },
        commenr_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: false
        },

    }
)

module.exports = mongoose.model('File', fileSchema)