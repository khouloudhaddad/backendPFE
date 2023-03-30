const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const roleSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        _permissions: Array
    }, 
    {timestamps: true}
)

module.exports = mongoose.model('Role', roleSchema)