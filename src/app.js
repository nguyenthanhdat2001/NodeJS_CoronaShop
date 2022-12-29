import express from "express";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from './routes/index.js'
import customer from './app/models/customer.js'
import session from 'express-session'

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connect db
import db from "./config/db/index.js";
db.Connect();

//Method override 
app.use(methodOverride('_method'))

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: oneDay,
    sameSite: 'strict'
  }
}))

// parsing the incoming data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(path.join(__dirname, "public")));

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

//Route init
router(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
