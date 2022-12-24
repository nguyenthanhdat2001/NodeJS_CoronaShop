import express from 'express'
import checkoutController from '../../../app/controllers/Admin/modules/CheckoutController.js'

const router = express.Router()

router.put('/payment/:id/submit', checkoutController.payment_submit)
router.get('/payment/:id',checkoutController.show)
router.get('/payment',checkoutController.payment)
router.get('/shipping', checkoutController.shipping)
router.get('/delivery', checkoutController.delivery)
 
export default router