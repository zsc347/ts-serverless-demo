import { taskDao } from "@tsw/dao";

export class TaskService {
    public async list() {
        return taskDao.list();
    }

    public async add() {
        taskDao.save({
            tid: "task-1"
        });
    }

    public async delete() {
        taskDao.delete("task-1");
    }
}

const taskService = new TaskService();

export { taskService };
