import mongoose from "mongoose";
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

//get session
app.get('/set_session', (req, res, next) => {
    //set a object to session   
    AccountModal.findById('639fe3587877e1085114e5e3')
        .then(data => {
            if(data){
                req.session.User = data._id
                res.redirect('/get_session')
            }else{
                res.send('ID sai')
            }
        }).catch(next)

})

//set session
app.get('/get_session', (req, res) => {
    //check session
    if (req.session.User) {
        return res.status(200).json({ status: 'success', session: req.session.User })
    }
    return res.status(200).json({ status: 'error', session: 'No session' })
})

//destroy session
app.get('/destroy_session', (req, res) => {
    //destroy session
    req.session.destroy(function (err) {
        return res.status(200).json({ status: 'success', session: 'cannot access session here' })
    })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
