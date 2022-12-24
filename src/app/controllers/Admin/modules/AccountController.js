import { mongoose } from '../../../../util/mongoose.js'
import customer from '../../../models/customer.js'

class AccountController {
    customer(req, res, next) {
        customer.find({})
            .then(data => res.render('Admin/Account/customer', {
                data: mongoose.multipleMongooseToObject(data),
                layout: 'admin.hbs'
            })).catch(next)
    }
    customer_delete(req, res, next) {
        customer.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

}
export default new AccountController