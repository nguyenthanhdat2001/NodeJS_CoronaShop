import customer from "../../models/customer.js"

class AuthController {
    //[GET] /auth/login
    login(req, res, next) {
        res.render('login')
    }
    //[POST] /auth/login_post
    login_post(req, res, next) {
        const username = req.body.username
        const password = req.body.password

        customer.findOne({
            username: username,
            password: password
        }).then(data => {
            if (data) {
                req.session.cusID = data._id
                res.redirect('/')
            }else{
                res.redirect('/auth/login')
            }
        }).catch(next)
    }
    //[GET] /auth/register
    register(req, res, next) {
        res.render('register')
    }
    //[POST] /auth/register_post
    register_post(req, res, next) {
        const data = req.body
        const item = new customer(data)
        item.save()
            .then(() => {
                res.redirect('/auth/login')
            })
            .catch(next)
    }
}

export default new AuthController