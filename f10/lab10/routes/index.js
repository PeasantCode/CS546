import { Router } from "express";
import {
  checkEmail,
  checkPassword,
  checkRole,
  checkValidName,
  isAuthenticated,
  isAdminAuthenticated,
} from "../helper.js";
import { createUser, checkUser } from "../data/user.js";

const loginRouter = Router();
const registerRouter = Router();
const protectedRouter = Router();
const adminRouter = Router();
const logoutRouter = Router();
const errorRouter = Router();




export  const constructorMethod = (app) => {
  app.use("/", async(req, res) => {
    const url = req.originalUrl;
    if(url==='/'){
      if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    } else {
      return res.redirect("/login");
    }
    }
  });

  loginRouter
    .route("/login")
    .get(async (req, res) => {
      const role = req.session.user?.role;
      if (role) return res.redirect("/");
      return res.render("login");
    })
    .post(async (req, res) => {
      const role = req.session.user?.role;
      if (role) return res.redirect("/");

      const { emailAddressInput, passwordInput } = req.body;
      try {
        emailAddressInput = checkEmail(emailAddressInput, "emailAddressInput");
        passwordInput = checkPassword(passwordInput, "passwordInput");
      } catch (e) {
        return res.status(400).render("login", { error: e });
      }

      try {
        const user = await checkUser(emailAddressInput, passwordInput);
        if (user) {
          req.session.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            role: user.role,
          };
        }

        return res.redirect("/");
      } catch (e) {
        return res.status(400).render("login", { error: e });
      }
    });

  registerRouter.route("/register").post(async (req, res) => {
    const {
      firstNameInput,
      lastNameInput,
      emailAddressInput,
      passwordInput,
      confirmPasswordInput,
      roleInput,
    } = req.body;
    try {
      firstNameInput = checkValidName(firstNameInput, "firstNameInput");
      lastNameInput = checkValidName(lastNameInput, "lastNameInput");
      emailAddressInput = checkEmail(emailAddressInput, "emailAddressInput");
      passwordInput = checkPassword(passwordInput, "passwordInput");
      if (passwordInput !== confirmPasswordInput)
        throw "passwordInput is not same as confirmPasswordInput!";
      roleInput = checkRole(roleInput, "roleInput");
    } catch (e) {
      return res.status(400).render("register", { error: e });
    }
    try {
      const createNewUserReturn = await createUser(
        firstNameInput,
        lastNameInput,
        emailAddressInput,
        passwordInput,
        roleInput
      );
      if (!createNewUserReturn) {
        return res.render("/login");
      }
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  protectedRouter.route("/protected").get(isAuthenticated, async (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect("/login");
    const { firstName, role } = req.session.user;
    const currentTime = new Date().toLocaleString();
    return res.render("protected", { firstName, currentTime, role });
  });

  adminRouter.route("/admin").get(isAdminAuthenticated, async (req, res) => {
    const user = req.session.user;
    if (!user) {
      req.session.error = "You just are user!!!!!";
      res.redirect("/error");
    }
    const { firstName } = req.session.user;
    const currentTime = new Date().toLocaleString();
    return res.render("admin", { firstName, currentTime });
  });

  logoutRouter.route("/logout").get(async (req, res) => {
    const user = req.session.user;
    if (!user) res.redirect("/");
    res.session.destroy();
  });

  errorRouter.route("/error").get(async (req, res) => {
    const error = req.session.error;
    res.render("error", { error });
  });
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
  app.use("/protected", protectedRouter);
  app.use("/admin", adminRouter);
  app.use("/logout", logoutRouter);
  app.use("error", errorRouter);

  app.use("*", (req, res) => {
    res.statues(404).json({ error: "Route Not Found" });
  });
};
