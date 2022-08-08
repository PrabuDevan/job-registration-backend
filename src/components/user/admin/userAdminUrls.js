import { Router } from 'express'
import * as UserAdminController from './userAdminController.js'
import { verifyJwtToken, isAdmin } from '../../../services/auth.js'

const router = Router()

router.get('/find', verifyJwtToken, isAdmin, UserAdminController.findAll)
router.post('/user', verifyJwtToken, isAdmin, UserAdminController.createUser)
router.get('/user/:userId', verifyJwtToken, isAdmin, UserAdminController.getUser)
router.put('/user/:userId', verifyJwtToken, isAdmin, UserAdminController.updateUser)
router.delete('/user/:userId', verifyJwtToken, isAdmin, UserAdminController.deleteUser)

export default router