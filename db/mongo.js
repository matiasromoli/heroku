import { logger } from "../utils/loggerCon.js";
import { config } from "../config/config.js";
import { connect } from "mongoose";

(async () => {
  const db = await connect(config.db.mongo);
  logger.info("Database connected to", db.connection.name);
})();
