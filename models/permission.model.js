const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const permissionsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        privileges: {
            type: String,
            required: true,
            enum: ["read", "create", "edit", "delete"],
            default: ["read"]
        }
       
    }
)

module.exports = mongoose.model('Permissions', permissionsSchema)