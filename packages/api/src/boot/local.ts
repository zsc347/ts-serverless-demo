import { logger } from "@tsw/common";
import app from "../app/app";

function main() {
    const port = 3000;
    app.listen(port);
    logger.info(`User '${process.env.USER}',  listening on ${port}`);
}

main();
