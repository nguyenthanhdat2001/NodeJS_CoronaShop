import { mongoose } from '../../../../util/mongoose.js'
import category from '../../../models/category.js'

class CategoryController {
    //[POST] /Admin/Categories
    index(req, res, next) {
        category.find({})
            .then(categories => {
                res.render('Admin/Categories/index', {
                    categories: mongoose.multipleMongooseToObject(categories),
                    layout: 'admin.hbs'
                })
            })
            .catch(next)
    }
    //[POST] /Admin/Categories/create
    create_post(req, res, next) {
        const data = req.body
        // res.json(data)
        const item = new category(data)
        item.save()
            .then(() => {
                res.redirect('/admin/categories')
            })
            .catch(next)
    }
    //[GET] /Admin/categories/:id/edit
    edit(req, res, next) {
        category.findById(req.params.id)
            .then(categories => {
                res.render('Admin/Categories/update', {
                    categories: mongoose.mongooseToObject(categories),
                    layout: 'admin.hbs'
                })
            })
            .catch(next)
    }

    //[PUT] /Admin/categories/:id
    edit_post(req, res, next) {
        // res.json(req.body)
        const data = req.body
        category.updateOne({ _id: req.params.id }, data)
            .then(() => res.redirect('/admin/categories'))
            .catch(next)
    }

    //[DELETE] /Admin/categories/:id/delete
    remove(req, res, next) {
        category.delete({ _id: req.params.id })
            .then(() => { res.redirect('back') })
            .catch(next)
    }
}

export default new CategoryController