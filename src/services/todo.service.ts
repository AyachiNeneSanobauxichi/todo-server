import type { TodoPayload } from "@/types";
import { todoRepository } from "@/repositories";

const todoService = {
  async createTodo(todoPayload: TodoPayload) {
    return todoRepository.createTodo("6a39428a2371f0a97a3b847e", todoPayload);
  },
};

export { todoService };
