import product from '../models/product.js'
import category from '../models/category.js'
import bill from '../models/bill.js'
import { mongoose } from '../../util/mongoose.js'
class SiteController {
    index(req, res, next) {
        //[GET] /
        Promise.all([
            product.find({}),
            category.find({}),
        ]).then(([products, categories]) =>
            res.render('home', {
                layout: false,
                products: mongoose.multipleMongooseToObject(products),
                categories: mongoose.multipleMongooseToObject(categories)
            })
        ).catch(next)
    }
    //[GET] /products
    product(req, res) {
        res.render('Products/index')

    }
    //[GET] /shopping-cart
    cart(req, res, next) {
        res.render('shopping_cart')
    }
    checkout(req, res, next) {
        res.render('checkout')
    }
}

export default new SiteController