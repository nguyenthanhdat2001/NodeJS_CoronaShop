import express from 'express'
import siteController from '../app/controllers/SiteController.js'

const router = express.Router()

router.get('/shopping-cart',siteController.cart)
router.get('/products', siteController.product)
router.get('/', siteController.index)

export default router
