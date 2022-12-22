import { mongoose } from "../../../util/mongoose.js";

class CartController {
    index(req, res, next) {
        req.user
            .populate('cart.items.productID')
            .then(userCart => {
                res.render('shopping_cart', {
                    cartItem: mongoose.multipleMongooseToObject(userCart.cart.items),
                    cart: mongoose.mongooseToObject(userCart.cart)
                })
            }).catch(next)
    }

    delete(req, res, next) {
        req.user.removeFromCart(req.params.id)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    update(req, res, next) {
        req.user.updateCart(req.body.quantity)
            .then(() => res.redirect('/shopping-cart') )
            .catch(next)
    }
}

export default new CartController