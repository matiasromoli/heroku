import { config } from "./config/config.js";
import session from "express-session";
import express from "express";
import path from "path";
import "./db/mongo.js";
const app = express();

app.use(
  session({
    secret: config.passport.secret,
    cookie: { maxAge: 600000 },
    saveUninitialized: false,
    rolling: true,
    resave: true,
  })
);

import passport from "passport";
import "./utils/passport.js";
app.use(passport.session());

import { URL } from "./utils/utils.js";
const __dirname = URL(import.meta.url);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import routes from "./src/routes/routes.js";
app.use("/", routes);

import { logger } from "./utils/loggerCon.js";

app.listen(process.env.PORT || config.server.port, () => {
  logger.info("Server connected");
});
