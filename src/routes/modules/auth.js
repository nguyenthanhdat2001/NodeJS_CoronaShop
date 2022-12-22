import express from 'express'
import authController from '../../app/controllers/modules/AuthController.js'

const router = express.Router()

router.post('/register_post', authController.register_post)
router.get('/register', authController.register)
router.get('/login', authController.login)

export default router
