import { VERSION } from "@tsw/common";
import { Router } from "express";

const router = Router();

router.get("/status", async (req, res) => {
    res.json({ status: "ok" });
});

router.get("/metadata", async (req, res) => {
    res.json({ version: VERSION });
});

export { router as metricRouter };
