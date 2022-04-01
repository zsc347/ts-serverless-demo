import { taskService } from "@tsw/service";
import { Router } from "express";

const router = Router();

router.get("/status", async (req, res) => {
  res.json({ status: "ok" });
});

export { router as metricRouter };
