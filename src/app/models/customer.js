import mongoose from "mongoose";
import CartController from "../controllers/modules/CartController.js";
import Product from "./product.js";

const Schema = mongoose.Schema;
const customer = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: { type: String, require: true },
    cart: {
        items: [{
            productID: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                require: true
            },
            size: { type: String },
            color: { type: String },
            quantity: { type: Number, require: true },
        }],
        total_price: { type: Number }
    }
});

customer.methods.addToCart = async function (AddToCart) {
    const product = await Product.findById(AddToCart.id)
    if (product) {
        const cart = this.cart
        const isExisting = cart.items.findIndex(objInItems =>
            String(objInItems.productID).trim() === String(product._id).trim()
            && String(objInItems.size) === String(AddToCart.size)
            && String(objInItems.color) === String(AddToCart.color)
        )

        if (isExisting >= 0) {
            const itemExist = cart.items[isExisting]
            itemExist.quantity += parseInt(AddToCart.quantity)
        } else {
            cart.items.push({
                productID: AddToCart.id,
                quantity: AddToCart.quantity,
                size: AddToCart.size,
                color: AddToCart.color
            });
        }
        if (!cart.total_price) {
            cart.total_price = 0;
        }
        cart.total_price += product.price * parseInt(AddToCart.quantity)
        return this.save();
    }
}

customer.methods.updateCart = async function (CurrentQuantity) {
    const cart = this.cart
    cart.total_price = 0
    for (let i = 0; i < cart.items.length; i++) {
        cart.items[i].quantity = CurrentQuantity[i]
        let prod = await Product.findById(cart.items[i].productID)
        cart.total_price += prod.price * cart.items[i].quantity
    }
    return this.save();
}

customer.methods.removeFromCart = async function (objID) {
    const cart = this.cart
    const isExisting = cart.items.findIndex(objInItems =>
        String(objInItems._id).trim() === objID.trim()
    )
    if (isExisting >= 0) {
        const prod = await Product.findById(cart.items[isExisting].productID)
        cart.total_price -= prod.price * cart.items[isExisting].quantity
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}

export default mongoose.model('customer', customer)