import express from "express";
import { metricRouter, taskRouter } from "../routes";

const app = express();

app.use("/v1", metricRouter);
app.use("/v1", taskRouter);

export default app;
