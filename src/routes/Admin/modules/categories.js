import express from 'express'
import categoryController from '../../../app/controllers/Admin/modules/CategoryController.js'

const router = express.Router()

router.delete('/:id', categoryController.remove)
router.get('/:id/edit', categoryController.edit)
router.put('/:id', categoryController.edit_post)
router.post('/create_post', categoryController.create_post)
router.get('/', categoryController.index)

export default router