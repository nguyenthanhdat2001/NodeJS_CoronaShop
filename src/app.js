import express from "express";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from './routes/index.js'
import customer from './app/models/customer.js'

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connect db
import db from "./config/db/index.js";
db.Connect();

//Method override 
app.use(methodOverride('_method'))

//Static file
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      multiplication: (a, b) => a * b
    }
  }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Morgan HTTP logger
// app.use(morgan("combined"));

//check login
app.use((req, res, next) => {
  customer.findById('63a27e54ea49ea5545391744')
    .then(customerID => {
      req.user = customerID;
      next()
    })
    .catch(next)
})

//Route init
router(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
