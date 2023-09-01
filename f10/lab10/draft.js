import express from "express";
import { Router } from "express";

const app = express();
const router = Router();

app.use(async (req, res, next) => {});
router.get(async (req, res, next) => {});

router.route("/").get(async (req, res, next) => {
  res.json(JSON.stringify(next.toString()))
  console.log(next.toString());
});
app.use("/", router);
app.listen(3000,() => {
  console.log('got a server running on http://localhost:3000/');
})

const f = (a, b, c) => {
  console.log(a, b, c);
};

console.log(f);
console.log(f.toString());
