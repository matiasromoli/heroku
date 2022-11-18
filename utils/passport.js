import * as passLocal from "passport-local";
import { user } from "../db/schema.js";
import passport from "passport";

passport.use(
  "signup",
  new passLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let userEmail = await user.findOne({ email });
        if (userEmail) return done(null, false);

        const usuario = await user.create({
          user: req.body.nombre,
          password,
          email,
        });
        return done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signin",
  new passLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = await user.findOne({ email });
        if (!usuario)
          return done(null, false, console.log("El usuario no existe"));

        const validate = await usuario.isValidPassword(password);
        if (!validate) {
          return done(
            null,
            false,
            console.log("Por favor, vuelva a introducir la contraseña")
          );
        }
        return done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const data = await user.findById(id);
  done(null, data);
});
