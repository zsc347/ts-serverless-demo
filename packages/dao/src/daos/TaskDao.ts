import { logger } from "@tsw/common";

export interface TaskItem {
    tid: string;
}

const store = new Map<string, TaskItem>();

class TaskDao {
    public async save(item: TaskItem) {
        logger.debug("save", item);
        store.set(item.tid, item);
    }

    public async delete(tid: string) {
        logger.debug("delete", tid);
        store.delete(tid);
    }

    public async list(): Promise<TaskItem[]> {
        logger.debug("list");
        return Array.from(store.values());
    }

    public async get(tid: string) {
        logger.debug(`get task ${tid}`);
        return store.get(tid);
    }
}

const taskDao = new TaskDao();

export { taskDao };
