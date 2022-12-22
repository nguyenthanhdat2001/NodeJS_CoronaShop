import express from 'express'
import productController from '../../app/controllers/modules/ProductController.js'

const router = express.Router()

router.post('/add_to_cart', productController.addToCart)
router.get('/:slug', productController.show)
router.get('/', productController.index)

export default router