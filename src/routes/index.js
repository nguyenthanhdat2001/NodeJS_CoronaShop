//important


//import admin router
import adminRouter from './Admin/siteAdmin.js'
import authRouter from './Admin/modules/auth.js'
import productRouter from './Admin/modules/products.js'
import categoryRouter from './Admin/modules/categories.js'
import trashRouter from './Admin/modules/trash.js'
//import client router
import siteRouter from './site.js'
import auth_ClientRouter from './modules/auth.js'
import products_ClientRouter from './modules/products.js'
import cart_ClientRouter from './modules/cart.js'
// import blogs_ClientRouter from './modules/blogs.js'
// import about_ClientRouter from './modules/about.js'
// import contact_ClientRouter from './modules/contact.js'

function route(app) {
    //Admin
    app.use("/admin/trash", trashRouter);
    app.use("/admin/categories", categoryRouter);
    app.use("/admin/products", productRouter);
    app.use("/admin/auth", authRouter);
    app.use("/admin", adminRouter);

    //check login

    //Client
    app.use("/shopping-cart", cart_ClientRouter)
    app.use("/auth", auth_ClientRouter);
    app.use("/products", products_ClientRouter);
    app.use("/", siteRouter);
}

export default route
