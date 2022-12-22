import express from 'express'
import authController from '../../../app/controllers/Admin/modules/AuthController.js'

const router = express.Router()

// router.get('/:slug', newsController.show)

router.get('/login', authController.login)
router.get('/register', authController.register)

export default router