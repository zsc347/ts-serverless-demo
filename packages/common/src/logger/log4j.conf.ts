import { Configuration } from "log4js";

const log4jConfig: Configuration = {
    appenders: {
        default: {
            type: "console",
            layout: {
                type: "pattern",
                pattern: "%d %p %c [%f{3}:%l:%o] %m%n"
            }
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
