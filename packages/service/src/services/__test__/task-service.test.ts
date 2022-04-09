import { TaskItem } from "@tsw/dao/src/daos/TaskDao";
import { taskService } from "../TaskService";

describe("test task service", () => {
    it("can save items to store", async () => {
        await taskService.add({
            tid: "task1"
        });
        await taskService.add({
            tid: "task2"
        });

        const items: TaskItem[] = await taskService.list();
        expect(items.length).toBe(2);
    });
});
