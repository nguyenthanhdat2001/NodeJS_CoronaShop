import express from 'express'
import checkoutController from '../../app/controllers/modules/CheckoutController.js'

const router = express.Router()

router.put('/:id/delivery',checkoutController.delivery)
router.delete('/:id/cancel',checkoutController.cancel)
router.get('/:id',checkoutController.show)
router.get('/',checkoutController.index)

export default router