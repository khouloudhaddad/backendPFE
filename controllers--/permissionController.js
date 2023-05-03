const asyncHandler = require('express-async-handler')
const Permission = require('../models/permissionModel')

//@desc  Get permissions
//@route GET /api/permissions
//@access Private
const getPermissions = asyncHandler(async (req, res) => {
    const permissions = await Permission.find({})
    res.status(200).json(permissions)
})

//@desc  Get permission By Id
//@route GET /api/permissions/:id
//@access Private
const getPermissionById = asyncHandler(async (req, res) => {
    const permission = await Permission.findById(req.params.id)
    res.status(200).json(permission)
})

//@desc  Set permissions
//@route POST /api/permissions
//@access Private
const setPermission = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const permission = await Permission.create({
        text: req.body.text
    })

    res.status(200).json(permission)
})

//@desc  Update permissions
//@route PUT /api/permissions/:id
//@access Private
const updatePermission = asyncHandler(async (req, res) => {
    const permission = await Permission.findById(req.params.id);

    if(!permission){
        res.status(400)
        throw new Error('Permission not found')
    }

    const updatedPermission = await Permission.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedPermission)
})

//@desc  Delete permissions
//@route Delete /api/permissions/:id
//@access Private
const deletePermission = asyncHandler(async (req, res) => {
    const permission = await Permission.findById(req.params.id);

    if(!permission){
        res.status(400)
        throw new Error('Permission not found')
    }

    const deletedPermission = await Permission.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getPermissions,
    getPermissionById,
    setPermission,
    updatePermission,
    deletePermission,
}