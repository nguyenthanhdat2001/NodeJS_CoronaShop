import express from 'express'
import authController from '../../app/controllers/modules/AuthController.js'

const router = express.Router()

router.post('/register_post', authController.register_post)
router.get('/register', authController.register)
// router.post('/login_post', authController.login_post)
router.get('/login', authController.login)

export default router
