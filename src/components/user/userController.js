import User from './userModel.js'
import * as AuthService from '../../services/auth.js'


export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }, 'password isAdmin').lean()
        if (!user) return res.status(400).json({ message: 'User doesn\'t exist!' })
        const isUserValid = await AuthService.comparePassword(req.body.password, user.password)
        if (!isUserValid) return res.status(401).json({ message: 'Incorrect Password' })
        const token = AuthService.generateJwtToken(user)
        return res.json({ token, isAdmin: user.isAdmin })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const register = async (req, res) => {
    try {
        req.body.password = await AuthService.hashPassword(req.body.password)
        const user = await User.create(req.body)
        const token = AuthService.generateJwtToken(user)
        return res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ _id: res.locals.user._id }, 'username isAdmin').lean()
        res.json(user)
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}