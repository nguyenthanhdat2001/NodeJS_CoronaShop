import customer from "../../models/customer.js"

class AuthController {
    //[GET] /auth/login
    login(req, res, next) {
        res.render('login')
    }
    //[GET] /auth/register
    register(req, res, next) {
        res.render('register')
    }
    //[GET] /auth/register_post
    register_post(req, res, next) {
        const data = req.body
        const item = new customer(data)
        item.save()
            .then(() => {
                res.redirect('/auth/login')
            })
            .catch()
    }
}

export default new AuthController