import { configure } from "@vendia/serverless-express";
import app from "./app/app";
const handler = configure({ app });
export { handler };
