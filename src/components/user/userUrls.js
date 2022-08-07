import { Router } from 'express'
import * as UserController from './userController.js'
import { verifyJwtToken } from '../../services/auth.js'
import adminRoutes from './admin/userAdminUrls.js'

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user-details', verifyJwtToken, UserController.getUserDetails)
router.use('/admin', adminRoutes)

export default router