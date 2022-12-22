import product from "../../models/product.js"
import category from "../../models/category.js"
class AdminController {
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
    auth(req, res) {
        res.render('Admin/Auth/login', { layout: false })
    }
    products(req, res) {
        res.render('Admin/Products')
    }
    categories(req, res) {
        res.render('Admin/Categories')
    }
}

export default new AdminController