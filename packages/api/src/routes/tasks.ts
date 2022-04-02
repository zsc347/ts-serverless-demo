import { Router } from "express";
import { taskService } from "@tsw/service";
import { logger } from "@tsw/common";

const router = Router();

router.get("/tasks", async (req, res) => {
    logger.debug("get tasks", req);
    const items = await taskService.list();
    res.json({ items });
});

export { router as taskRouter };
