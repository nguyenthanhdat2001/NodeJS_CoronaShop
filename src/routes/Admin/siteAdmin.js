import express from 'express'
import siteAdminController from '../../app/controllers/Admin/SiteAdminController.js'

const router = express.Router()

router.get('/categories', siteAdminController.categories)
router.get('/products', siteAdminController.products)
router.get('/auth', siteAdminController.auth)
router.get('/', siteAdminController.index)

export default router
