import express from 'express'
import accountController from '../../../app/controllers/Admin/modules/AccountController.js'

const router = express.Router()

// router.get('/administrator', accountController.administrator)
router.delete('/customer/:id/delete', accountController.customer_delete)
router.get('/customer', accountController.customer)

export default router