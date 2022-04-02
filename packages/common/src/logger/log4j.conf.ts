import { Configuration } from "log4js";

const log4jConfig: Configuration = {
    appenders: {
        default: {
            type: "console"
        }
    },
    categories: {
        default: {
            appenders: ["default"],
            level: "debug",
            enableCallStack: true
        }
    }
};

export default log4jConfig;
