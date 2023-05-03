const asyncHandler = require('express-async-handler')
const Role = require('../models/roleModel')

//@desc  Get roles
//@route GET /api/roles
//@access Private
const getRoles = asyncHandler(async (req, res) => {
    const roles = await Role.find({})
    res.status(200).json(roles)
})

//@desc  Get role By Id
//@route GET /api/roles/:id
//@access Private
const getRoleById = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id)
    res.status(200).json(role)
})

//@desc  Set roles
//@route POST /api/roles
//@access Private
const setRole = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const role = await Role.create({
        text: req.body.text
    })

    res.status(200).json(role)
})

//@desc  Update roles
//@route PUT /api/roles/:id
//@access Private
const updateRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);

    if(!role){
        res.status(400)
        throw new Error('Role not found')
    }

    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedRole)
})

//@desc  Delete roles
//@route Delete /api/roles/:id
//@access Private
const deleteRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);

    if(!role){
        res.status(400)
        throw new Error('Role not found')
    }

    const deletedRole = await Role.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getRoles,
    getRoleById,
    setRole,
    updateRole,
    deleteRole,
}