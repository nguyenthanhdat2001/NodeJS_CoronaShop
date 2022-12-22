import product from '../../../models/product.js'
import category from '../../../models/category.js'
import { mongoose } from '../../../../util/mongoose.js'

class TrashController {
    //[GET] /trash/products/
    productsTrash(req, res, next) {
        product.findDeleted({})
            .then(products => {
                res.render("Admin/Trash/productsTrash", {
                    products: mongoose.multipleMongooseToObject(products),
                    layout: 'admin.hbs'
                })
            })
            .catch(next)
    }
    //[DELETE] /trash/products/:id
    deleteProduct(req, res, next) {
        product.deleteOne({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }
    //[PATCH] /products/:id/restore
    restoreProduct(req, res, next) {
        product.restore({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }

    //[GET] /trash/categories
    categoriesTrash(req, res, next) {
        category.findDeleted({})
            .then(categories => {
                res.render("Admin/Trash/categoriesTrash", {
                    categories: mongoose.multipleMongooseToObject(categories),
                    layout: 'admin.hbs'
                })
            })
            .catch(next)
    }
    //[DELETE] /trash/products/:id
    deleteCategory(req, res, next) {
        category.deleteOne({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }
    //[PATCH] /products/:id/restore
    restoreCategory(req, res, next) {
        category.restore({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }
}

export default new TrashController