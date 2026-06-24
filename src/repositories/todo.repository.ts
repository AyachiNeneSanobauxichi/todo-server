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

  updateTodo: (id: string, data: TodoPayload) => {
    return TodoModel.findByIdAndUpdate(id, data, { new: true });
  },

  deleteTodo: (id: string) => {
    return TodoModel.findByIdAndDelete(id);
  },
};

export { todoRepository };
