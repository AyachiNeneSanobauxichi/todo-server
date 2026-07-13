import type { TodoPayload, TodoQueryOptions } from "@/types";
import { TodoModel } from "@/models";

const todoRepository = {
  createTodo: (userId: string, data: TodoPayload) => {
    return TodoModel.create({ ...data, userId });
  },

  findTodoById: (userId: string, id: string) => {
    return TodoModel.findOne({
      _id: id,
      userId,
    }).select("+content");
  },

  findTodoByUserId: (userId: string, options: TodoQueryOptions) => {
    const {
      pageNumber,
      pageSize,
      todoName,
      todoType,
      todoStatus,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    const filter = Object.fromEntries(
      Object.entries({
        userId,
        name: todoName ? { $regex: todoName, $options: "i" } : void 0,
        type: todoType || void 0,
        status: todoStatus || { $ne: "deleted" },
      }).filter(([_, val]) => !!val),
    );

    return TodoModel.paginate(filter, {
      page: pageNumber,
      limit: pageSize,
      sort: { [sortBy]: sortOrder === "desc" ? -1 : 1 },
    });
  },

  findTodoByIdAndUserId: (id: string, userId: string) => {
    return TodoModel.findOne({ _id: id, userId });
  },

  updateTodo: (id: string, data: Partial<TodoPayload>) => {
    return TodoModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
  },

  deleteTodo: (id: string) => {
    return TodoModel.findByIdAndUpdate(id, { status: "deleted" });
  },
};

export { todoRepository };
