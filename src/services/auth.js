import constant from '../constant.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const getToken = authHeader => authHeader.split(' ')[1]


// generate JWT token with user _id as data
const generateAuthToken = SECRET => ({ _id, isAdmin }) => jwt.sign({ _id, isAdmin }, SECRET)


const verifyJwt = SECRET => (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ type: 'no-token', message: 'No token present in Authorization Header' })
    const token = getToken(authHeader)
    jwt.verify(token, SECRET, (err, data) => {
        if (err) return res.status(401).json({ type: 'token-invalid', message: "" })
        res.locals.user = data
        next()
    })
}


const useJwt = SECRET => [generateAuthToken(SECRET), verifyJwt(SECRET)]


export const [generateJwtToken, verifyJwtToken] = useJwt(process.env.JWT_SECRET)


export const hashPassword = async password => {
    try {
        const salt = await bcrypt.genSalt(constant.SALT_ROUNDS)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.log(error)
    }
    return null
}


export const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.log(error)
    }
    return false
}


export const isAdmin = (req, res, next) => {
    if (res.locals?.user?.isAdmin) return next()
    return res.status(401).json({ type: 'not-a-admin', message: 'User must be an admin to access this route' })
}
