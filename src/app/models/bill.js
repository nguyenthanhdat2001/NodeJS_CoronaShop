import mongoose from "mongoose";

const Schema = mongoose.Schema;
const bills = new Schema({
    customerID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'customer'
    },
    bought: [{
        // product_name: { type: String },
        // price: { type: Number },
        // size: { type: String },
        // color: { type: String },
        // quantity: { type: Number, require: true },
    }],
    customer_name: { type: String },
    city: { type: String },
    district: { type: String },
    wards: { type: String },
    phone_number: { type: String },
    address: { type: String },
    total_price: { type: Number },
    payment_status: { type: Boolean, default: false },
    shipping_status: { type: Boolean, default: false },
    delivery_status: { type: Boolean, default: false },
}, {
    timestamps: true
});


export default mongoose.model('bill', bills)