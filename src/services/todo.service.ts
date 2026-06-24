import type { TodoPayload } from "@/types";
import { todoRepository } from "@/repositories";

const todoService = {
  async createTodo(userId: string, todoPayload: TodoPayload) {
    return todoRepository.createTodo(userId, todoPayload);
  },
};

export { todoService };
