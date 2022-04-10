import { configure, getLogger } from "log4js";
import log4jConfig from "./log4j.conf";
import { install } from "source-map-support";

// source map support will add about 200ms of cold start time
if (process.env.STAGE !== "production") {
    install();
}

configure(log4jConfig);

const logger = getLogger();
export { logger };
