import User from '../userModel.js'
import * as AuthService from '../../../services/auth.js'


export const findAll = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).lean().exec()
        return res.json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const createUser = async (req, res) => {
    try {
        req.body.password = await AuthService.hashPassword(req.body.password)
        const user = await User.create(req.body)
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).lean()
        return res.json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body).lean()
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId, 'isAdmin')
        if (!user?.isAdmin) {
            await User.findByIdAndDelete(req.params.userId)
            return res.sendStatus(200)
        }
        return res.send(400).json({ message: 'Cannot delete admin' })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}