import { mongoose } from '../../../../util/mongoose.js'
import Bill from '../../../models/bill.js'

class CheckoutController {
    //[GET] /admin/checkout/payment
    payment(req, res, next) {
        Bill.find({
            payment_status: false,
            shipping_status: false
        })
            .then((data) =>
                res.render('Admin/Checkout/payment_status', {
                    layout: 'admin.hbs',
                    bill: mongoose.multipleMongooseToObject(data),
                    title: 'Chờ thanh toán'
                }))
    }
    //[PUT] /admin/checkout/payment/:id
    payment_submit(req, res, next) {
        const data = { payment_status: true }
        Bill.updateOne({ _id: req.params.id }, data)
            .then(() => { res.redirect('/admin/checkout/shipping') })
            .catch(next)
    }
    //[GET] /admin/checkout/shipping
    shipping(req, res, next) {
        Bill.find({ 
            payment_status: true,
            shipping_status: false
         })
            .then((data) => res.render('Admin/Checkout/shipping_status', {
                layout: 'admin.hbs',
                bill: mongoose.multipleMongooseToObject(data),
                title: 'Đang vận chuyển'
            }))
    }
    //[GET] /admin/checkout/delivery
    delivery(req, res, next) {
        Bill.find({
            payment_status: true,
            shipping_status: true
        })
            .then((data) => res.render('Admin/Checkout/delivery_status', {
                layout: 'admin.hbs',
                bill: mongoose.multipleMongooseToObject(data),
                title: 'Giao dịch hoàn tất'
            }))
    }
    //[GET] /admin/checkout/payment/:id/detail
    show(req, res, next) {
        Bill.findById(req.params.id)
            .then(data => res.render("Admin/Checkout/showBill", {
                bill: mongoose.mongooseToObject(data),
                layout: 'admin.hbs'
            })
            ).catch(next)
    }

}

export default new CheckoutController