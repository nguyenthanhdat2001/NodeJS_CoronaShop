import express from 'express'
import cartController from '../../app/controllers/modules/CartController.js'

const router = express.Router()


router.post('/:id/remove', cartController.delete)
router.get('/', cartController.index)

export default router