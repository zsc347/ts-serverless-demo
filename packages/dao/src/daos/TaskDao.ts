import { logger } from "@tsw/common";

export interface TaskItem {
  tid: string;
}

class TaskDao {
  public async save(item: TaskItem) {
    logger.debug("save", item);
  }

  public async delete(tid: string) {
    logger.debug("delete", tid);
  }

  public async list(): Promise<TaskItem[]> {
    logger.debug("list");
    return [
      {
        tid: "task1",
      },
      {
        tid: "task2",
      },
      {
        tid: "task3",
      },
    ];
  }

  public async get(tid: string) {
    logger.debug(`get task ${tid}`);
  }
}

const taskDao = new TaskDao();

export { taskDao };
