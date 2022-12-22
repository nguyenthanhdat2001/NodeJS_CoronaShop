import express from 'express'
import productController from '../../../app/controllers/Admin/modules/ProductController.js'

const router = express.Router()

router.delete('/:id', productController.remove)
router.get('/:id/edit',productController.edit)
router.put('/:id', productController.edit_post)
router.post('/create_post', productController.create_post)
router.get('/', productController.index)

export default router
