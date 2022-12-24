import { response } from "express";
import { mongoose } from "../../../util/mongoose.js";

class CartController {
    index(req, res, next) {
        if (req.user) {
            req.user
                .populate('cart.items.productID')
                .then(userCart => {
                    res.render('shopping_cart', {
                        cartItem: mongoose.multipleMongooseToObject(userCart.cart.items),
                        cart: mongoose.mongooseToObject(userCart.cart),
                        userCart: mongoose.mongooseToObject(userCart)
                    })
                }).catch(next)
        } else {
            console.log('Chưa đăng nhập')
            res.redirect('/auth/login')
        }
    }

    delete(req, res, next) {
        req.user.removeFromCart(req.params.id)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    update(req, res, next) {
        req.user.updateCart(req.body.quantity)
            .then(() => res.redirect('/shopping-cart'))
            .catch(next)
    }
    checkout(req, res, next) {
        // res.json(req.body)
        const data = req.body
        req.user.removeCart(data)
        .then(()=> res.redirect('/checkout'))
    }
}

export default new CartController