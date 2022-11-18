import { fileURLToPath } from "url";
import { dirname } from "path";

export function URL(data) {
  const __filename = fileURLToPath(data);
  const __dirname = dirname(__filename);
  return __dirname;
}

export function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
