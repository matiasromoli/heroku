import { forkProcess } from "../utils/forkProcess.js";
import { logger } from "../utils/loggerCon.js";
import { user } from "../db/schema.js";
import { forked } from "../app.js";

export const controllers = {
  index: (req, res) => {
    res.render("index", {
      title: "Iniciar sesión",
    });
  },
  registerView: (req, res) => {
    res.render("models/register/register", {
      title: "Registrarse",
    });
  },
  profile: async (req, res) => {
    const datosUsuario = req.session.passport.user;
    const data = await user.findById(datosUsuario);
    res.render("models/profile/index.ejs", {
      user: data.user,
    });
  },
  failLogin: (req, res) => {
    res.render("models/fail/login");
  },
  failRegister: (req, res) => {
    res.render("models/fail/register");
  },
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
  info: (req, res) => {
    const data = {
      m: process.memoryUsage().rss,
      s: process.platform,
      a: process.argv[2],
      p: process.execPath,
      v: process.version,
      c: process.cwd(),
      i: process.pid,
    };
    console.log(data);
    res.send("Data por console");
  },
  randoms: (req, res) => {
    const data = forkProcess(req.query.cant);
    forked.send({ number: data });

    forked.on("message", (msg) => {
      res.json(msg);
    });
  },
  error: (req, res) => {
    logger.warn("La ruta no existe");
    res.send("Error, esta ruta no existe");
  },
};
