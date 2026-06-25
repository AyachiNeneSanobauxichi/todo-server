import type { TodoPayload } from "@/types";
import { todoRepository } from "@/repositories";
import { BizError } from "@/utils";

const todoService = {
  async createTodo(userId: string, todoPayload: TodoPayload) {
    return todoRepository.createTodo(userId, todoPayload);
  },

  async updateTodo(
    userId: string,
    todoId: string,
    todoPayload: Partial<TodoPayload>,
  ) {
    await this._checkTodoExists(userId, todoId);
    return todoRepository.updateTodo(todoId, todoPayload);
  },

  async deleteTodo(userId: string, todoId: string) {
    await this._checkTodoExists(userId, todoId);
    return todoRepository.deleteTodo(todoId);
  },

  async _checkTodoExists(userId: string, todoId: string) {
    const todo = await todoRepository.findTodoByIdAndUserId(todoId, userId);
    if (!todo) {
      throw new BizError("TODO_NOT_FOUND");
    }
    return todo;
  },
};

export { todoService };
