const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const permissionsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        privileges: {
            type: String,
            required: true,
            enum: [
                "readTask", "createTask", "editTask", "deleteTask","assignTask","changeTaskPriority",
                // "read_comment", "create_comment", "edit_comment", "delete_comment",
                "readTaskType", "createTaskType", "editTaskType", "deleteTaskType",
                "readUser", "createUser", "editUser", "deleteUser","changeUserStatus"
            ],
            default: ["read"]
        }
       
    }
)

module.exports = mongoose.model('Permissions', permissionsSchema)