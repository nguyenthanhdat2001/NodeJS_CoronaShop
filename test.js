import mongoose, { get } from "mongoose";
import express from 'express';
import session from 'express-session';
const app = express();
const port = 2000

//session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }
}));

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

function home(req,res){
    req.session.user = {
        data:'hello'
    }
    res.redirect('/test_session')
}
function test(req,res){
    res.json(req.session.user)
}


app.get('/test_session', test)
app.get('/', home)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
