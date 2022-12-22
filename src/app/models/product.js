import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const product = new Schema({
    category: { 
        type: String, 
        ref: 'category'
    },
    image: { type: String },
    name: { type: String, default: 'Áo cộc', require: true },
    price: { type: Number, min: 1, require: true },
    des: { type: String },
    slug: { type: String, slug: 'name', unique: true }
}, {
    timestamps: true
});

//Add plugins
mongoose.plugin(slug)
product.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

export default mongoose.model('products', product)