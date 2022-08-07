import { Router } from 'express'
import * as UserAdminController from './userAdminController.js'
import { verifyJwtToken, isAdmin } from '../../../services/auth.js'

const router = Router()

router.get('/find', UserAdminController.findAll)
router.post('/user', UserAdminController.createUser)
router.get('/user/:userId', UserAdminController.getUser)
router.put('/user/:userId', UserAdminController.updateUser)
router.delete('/user/:userId', UserAdminController.deleteUser)

export default router