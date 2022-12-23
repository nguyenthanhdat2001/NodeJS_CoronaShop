import product from '../../models/product.js'
import category from '../../models/category.js'
import { mongoose } from '../../../util/mongoose.js'

class ProductController {
    //[GET] /products
    index(req, res, next) {
        Promise.all([
            product.find({}),
            category.find({}),
        ]).then(([products, categories]) =>
            res.render('products', {
                products: mongoose.multipleMongooseToObject(products),
                categories: mongoose.multipleMongooseToObject(categories),
            })
        ).catch(next)
    }
    show(req, res, next) {
        Promise.all([
            product.find({}),
            product.findOne({ slug: req.params.slug }).populate('category')
        ]).then(([products, product]) =>
            res.render('products/show', {
                products: mongoose.multipleMongooseToObject(products),
                product: mongoose.mongooseToObject(product)
            })
        ).catch(next)
    }
    //[POST] /products/add_to_cart
    addToCart(req, res, next) {
        if(req.user){
            req.user.addToCart(req.body)
                .then(() => {
                    res.redirect('/shopping-cart')
                }
                ).catch(next)
        }else{
            res.redirect('/auth/login')
        }
    }
}

export default new ProductController

