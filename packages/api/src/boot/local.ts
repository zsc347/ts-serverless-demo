import { logger } from "@tsw/common";

import app from "../app";

function main() {
  const port = 3000;
  app.listen(port);

  logger.info(`${process.env.PRODUCT} listening on ${port}`);
}

main();
