import express from "express";
const app = express();
import session from "express-session";
import { constructorMethod } from "./routes/index.js";
import { logging } from "./helper.js";
import exphbs from "express-handlebars";

app.use(express.json()); //解析body
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AwesomeWebApp",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(logging);
constructorMethod(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
