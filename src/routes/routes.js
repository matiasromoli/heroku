import express from "express";
import passport from "passport";
const routes = express.Router();
import { auth } from "../../utils/utils.js";
import { controllers } from "../../controllers/index.js";

routes.get("/", controllers.index);
routes.get("/profile", auth, controllers.profile);
routes.get("/register", controllers.registerView);

routes.get("/info", controllers.info);
routes.get("/randoms", controllers.randoms);

routes.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/fail-register",
    passReqToCallback: true,
  })
);
routes.post(
  "/login",
  passport.authenticate("signin", {
    successRedirect: "/profile",
    failureRedirect: "fail-login",
  })
);

//session finaly
routes.get("/logout", controllers.logout);

//fail
routes.get("/fail-register", controllers.failRegister);
routes.get("/fail-login", controllers.failLogin);

routes.get("/*", controllers.error);

export default routes;
