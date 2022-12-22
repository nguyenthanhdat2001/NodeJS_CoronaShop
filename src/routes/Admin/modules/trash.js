import express from 'express'
import TrashController from '../../../app/controllers/Admin/modules/TrashController.js'

const router = express.Router()

router.get('/products', TrashController.productsTrash)
router.patch('/products/:id/restore', TrashController.restoreProduct)
router.delete('/products/:id/delete', TrashController.deleteProduct)

router.get('/categories', TrashController.categoriesTrash)
router.patch('/categories/:id/restore', TrashController.restoreCategory)
router.delete('/categories/:id/delete', TrashController.deleteCategory)


export default router