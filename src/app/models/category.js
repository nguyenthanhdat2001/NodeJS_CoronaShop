import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const categories = new Schema({
    name: { type: String },
    slug: { type: String, slug: 'name', unique: true }
}, {
    timestamps: true
});

//Add plugins
mongoose.plugin(slug)
categories.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

export default mongoose.model('category', categories)