import { next, register } from "./api/extension-api";
import { listen } from "./api/http-listener";
import { subscribe } from "./api/log-api";
import {
    EventType,
    FUNCTION_NAME,
    RECEIVER_NAME,
    RECEIVER_PORT,
    SUBSCRIPTION_BODY
} from "./conf";

function handleShutdown(event: "SIGINT" | "SIGTERM") {
    console.log("shutdown", { event });
    process.exit(0);
}

export async function main() {
    process.on("SIGINT", () => handleShutdown("SIGINT"));
    process.on("SIGTERM", () => handleShutdown("SIGTERM"));

    // register extension
    console.log("register");
    const extensionId = await register();
    console.log("extensionId", extensionId);

    // start log listener
    console.log("starting listener");
    const { logsQueue, server } = listen(await RECEIVER_NAME, RECEIVER_PORT);

    // subscribing listener to the Logs API
    console.log("subscribing listener");
    await subscribe(extensionId, SUBSCRIPTION_BODY, server);

    async function flush() {
        const date = new Date()
            .toISOString()
            .replace(/[^0-9]/gi, "-")
            .substring(0, 23);
        const key = "logs/" + FUNCTION_NAME + "/" + date + ".json";
        console.log("logs uploading: " + key);
        const body = JSON.stringify(logsQueue); // serialize log queue and add to S3 put request
        logsQueue.splice(0); // clear log queue
        console.log("logs sent: " + key, body);
    }

    while (true) {
        console.log("next");
        const event = await next(extensionId);
        switch (event.eventType) {
            case EventType.SHUTDOWN:
                await flush(); // upload remaining logs, during shutdown event
                handleShutdown(event);
                console.log("shutdown", event);
                break;
            case EventType.INVOKE:
                console.log("invoke");
                await flush();
                break;
            default:
                throw new Error("unknown event: " + event.eventType);
        }
    }
}

main();

export function hello() {
    console.log("hello");
}
