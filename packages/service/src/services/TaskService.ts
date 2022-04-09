import { taskDao } from "@tsw/dao";
import { TaskItem } from "@tsw/dao/src/daos/TaskDao";

export class TaskService {
    public async list() {
        return taskDao.list();
    }

    public async add(task: TaskItem) {
        taskDao.save(task);
    }

    public async delete(tid: string) {
        taskDao.delete(tid);
    }
}

const taskService = new TaskService();

export { taskService };
