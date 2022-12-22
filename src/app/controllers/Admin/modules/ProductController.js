import product from '../../../models/product.js'
import category from '../../../models/category.js'
import { mongoose } from '../../../../util/mongoose.js'

class ProductController {
    //[GET] /Admin/products
    index(req, res, next) {
        Promise.all([
            product.find({}).populate('category'),
            category.find({}),
        ]).then(([products, categories]) =>
                res.render("Admin/Products/index", {
                    products: mongoose.multipleMongooseToObject(products),
                    categories: mongoose.multipleMongooseToObject(categories),
                    layout: 'admin.hbs'
                })
            ).catch(next)
    }

    //[POST] /Admin/Products/create
    create_post(req, res, next) {
        const data = req.body
        const item = new product(data)
        item.save()
            .then(() => {
                res.redirect('/admin/products')
            })
            .catch(next)
    }

    //[GET] /Admin/Products/:id/edit/
    edit(req, res, next) {
        Promise.all([
            product.findById(req.params.id).populate('category'),
            category.find({}),
        ]).then(([products, categories]) =>
            res.render('Admin/Products/edit', {
                products: mongoose.mongooseToObject(products),
                categories: mongoose.multipleMongooseToObject(categories),
                layout: 'admin.hbs'
            })
        ).catch(next)
    }

    //[PUT] /Admin/Products/:id
    edit_post(req, res, next) {
        // res.json(req.body)
        const data = req.body
        product.updateOne({ _id: req.params.id }, data)
            .then(() => { res.redirect('/admin/products') })
            .catch(next)
    }

    //[DELETE] /Admin/Products/:id/delete
    remove(req, res, next) {
        product.delete({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }
}

export default new ProductController