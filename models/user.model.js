const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = require('./role.model');

const userSchema = mongoose.Schema(
    {
        full_name: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, required: true },
        status: { type: Boolean, required: true },
        password: { type: String, required: true, minLength: 8 },
        phone: { type:String, required: true, unique: true},
        role: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    },
    {timestamps: true}
)

module.exports = mongoose.model('User', userSchema)