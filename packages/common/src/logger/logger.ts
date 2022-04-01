import { configure, getLogger } from "log4js";
import log4jConfig from "./log4j.conf";

configure(log4jConfig);

const logger = getLogger();

export { logger };
