import type { TodoPayload } from "@/types";
import { TodoModel } from "@/models";

const todoRepository = {
  createTodo: (userId: string, data: TodoPayload) => {
    return TodoModel.create({ ...data, userId });
  },

  findTodoById: (id: string) => {
    return TodoModel.findById(id);
  },

  findTodoByUserId: (userId: string) => {
    return TodoModel.find({ userId });
  },

  findTodoByIdAndUserId: (id: string, userId: string) => {
    return TodoModel.findOne({ _id: id, userId, status: { $ne: "deleted" } });
  },

  updateTodo: (id: string, data: Partial<TodoPayload>) => {
    return TodoModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
  },

  deleteTodo: (id: string) => {
    return TodoModel.findByIdAndUpdate(id, { status: "deleted" });
  },
};

export { todoRepository };
