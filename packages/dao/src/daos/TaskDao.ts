import { log } from "@tsw/common";

export interface TaskItem {
  tid: string;
}

class TaskDao {
  public async save(item: TaskItem) {
    log.debug("save", item);
  }

  public async delete(tid: string) {
    log.debug("delete", tid);
  }

  public async list(): Promise<TaskItem[]> {
    log.debug("list");
    return [];
  }

  public async get(tid: string) {
    log.debug("get {}", tid);
  }
}

const taskDao = new TaskDao();

export { taskDao };
