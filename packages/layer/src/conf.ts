export const FUNCTION_NAME = process.env.AWS_LAMBDA_FUNCTION_NAME;

const TIMEOUT_MS = 1000; // Maximum time (in milliseconds) that a batch is buffered.
const MAX_BYTES = 262144; // Maximum size in bytes that the logs are buffered in memory.
const MAX_ITEMS = 10000; // Maximum number of events that are buffered in memory.

export const RECEIVER_NAME = "sandbox";
export const RECEIVER_PORT = 4243;

export const SUBSCRIPTION_BODY = {
    destination: {
        protocol: "HTTP",
        URI: `http://${RECEIVER_NAME}:${RECEIVER_PORT}`
    },
    types: ["platform", "function"],
    buffering: {
        timeoutMs: TIMEOUT_MS,
        maxBytes: MAX_BYTES,
        maxItems: MAX_ITEMS
    }
};

export enum EventType {
    // eslint-disable-next-line no-unused-vars
    INVOKE = "INVOKE",
    // eslint-disable-next-line no-unused-vars
    SHUTDOWN = "SHUTDOWN"
}
