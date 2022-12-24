import product from "../../models/product.js"
import category from "../../models/category.js"
class AdminController {
    // [GET] /admin
    index(req, res, next) {
        // res.render('Admin', { layout: 'admin.hbs' })
        Promise.all([
            product.countDocuments(),
            category.countDocuments(),
        ]).then(([productsCount, categoriesCount]) =>
            res.render("Admin", {
                layout: 'admin.hbs',
                productsCount,
                categoriesCount
            })
        ).catch(next)
    }
    // [GET] /admin/auth
    auth(req, res) {
        res.render('Admin/Auth/login', { layout: false })
    }
    // [GET] /admin/products
    products(req, res) {
        res.render('Admin/Products')
    }
    // [GET] /admin/categories
    categories(req, res) {
        res.render('Admin/Categories')
    }
}

export default new AdminController