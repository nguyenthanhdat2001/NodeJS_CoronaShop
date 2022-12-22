import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect('mongodb://localhost:27017/Test')
    .then(() => console.log('Connected!'));

const Schema = mongoose.Schema;

const account = new Schema({
    name: { type: String },
    course: { type: String, ref: 'course' }
});

const course = new Schema({
    name: { type: String },
    price: { type: Number },
});
const AccountModal = mongoose.model('account', account)
const CourseModal = mongoose.model('course', course)

AccountModal.find({}).populate('course')
    .then(data =>
        console.log(data)
    )
    .catch(err => console.log(err))

// CourseModal.find({})
//     .then(data =>
//         console.log(data)
//     )
//     .catch(err => console.log(err))


