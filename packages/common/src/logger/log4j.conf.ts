import { Configuration } from "log4js";

const log4jConfig: Configuration = {
  appenders: {
    default: {
      type: "console",
    },
  },
  categories: {},
};

export default log4jConfig;
