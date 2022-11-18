import minimist from "minimist";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  env: process.env.NODE,
  server: {
    port: minimist(process.argv.slice(2), {
      alias: {
        p: "port",
      },
      default: {
        port: 8080,
      },
    }),
  },
  db: {
    mongo: process.env.URI,
  },
  passport: {
    secret: process.env.SECRET_KEY,
  },
};
