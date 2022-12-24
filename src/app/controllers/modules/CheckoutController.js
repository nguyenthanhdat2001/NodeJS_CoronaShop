import bill from "../../models/bill.js"
import { mongoose } from "../../../util/mongoose.js"

class CheckoutController {
    //[GET] /checkout
    index(req, res, next) {
        const cusID = req.user._id
        Promise.all([
            bill.find({
                customerID: cusID,
                payment_status: false,
                shipping_status: false
            }),
            bill.find({
                customerID: cusID,
                payment_status: true,
                shipping_status: false
            }),
            bill.find({
                customerID: cusID,
                payment_status: true,
                shipping_status: true
            })
        ]).then(([pay, ship, delivery]) =>
            // res.json(pay)
            res.render('checkout', {
                pay: mongoose.multipleMongooseToObject(pay),
                ship: mongoose.multipleMongooseToObject(ship),
                delivery: mongoose.multipleMongooseToObject(delivery)
            })
        )
    }
    //[GET] /checkout/:id
    show(req, res, next) {
        bill.findById(req.params.id)
            .then(data =>
                res.render('showBill', {
                    bill: mongoose.mongooseToObject(data)
                })
            )
    } //[DELETE] /checkout/:id/cancel
    cancel(req, res, next) {
        bill.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[PUT] /checkout/:id/delivery
    delivery(req, res, next) {
        const data = { shipping_status: true }
        bill.updateOne({ _id: req.params.id }, data)
            .then(() => res.redirect('back'))
    }
}

export default new CheckoutController