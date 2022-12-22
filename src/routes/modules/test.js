import express from 'express'
import productController from '../../app/controllers/modules/ProductController.js'

const router = express.Router()

router.get('/trash',productController.trash)
router.patch('/:id/restore', productController.restore)
router.delete('/:id/delete', productController.delete)
router.delete('/:id', productController.remove)
router.get('/:id/edit',productController.edit)
router.put('/:id', productController.edit_post)
router.get('/create',productController.create)
router.post('/create_post', productController.create_post)
router.get('/:slug', productController.show)
router.get('/', productController.index)

export default router
