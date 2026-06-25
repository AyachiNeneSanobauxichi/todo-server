import type { Context } from "koa";
import type { CreateTodoDTO, UpdateTodoDTO } from "@/interfaces";
import { todoService } from "@/services";
import { success } from "@/utils";

const todoController = {
  async createTodo(ctx: Context) {
    const userId = ctx.state.user.userId;
    const todoPayload = ctx.request.body as CreateTodoDTO;
    const data = await todoService.createTodo(userId, todoPayload);
    success(ctx, data, "Todo created successfully");
  },

  async getTodoById(ctx: Context) {
    const userId = ctx.state.user.userId;
    const todoId = ctx.params.id;
    const todo = await todoService.getTodoById(userId, todoId);
    success(ctx, todo, "get todo successfully");
  },

  async updateTodo(ctx: Context) {
    const userId = ctx.state.user.userId;
    const updateTodoPayload = ctx.request.body as UpdateTodoDTO;
    const data = await todoService.updateTodo(
      userId,
      updateTodoPayload.id,
      updateTodoPayload,
    );
    success(ctx, data, "Todo updated successfully");
  },

  async deleteTodo(ctx: Context) {
    const userId = ctx.state.user.userId;
    const { id } = ctx.params;
    const data = await todoService.deleteTodo(userId, id);
    success(ctx, data, "Todo deleted successfully");
  },

  async getTodoList(ctx: Context) {
    // const { name, password } = ctx.request.body as LoginDTO;
    // const data = await authService.register(username, password);
    // success(ctx, data);
  },
};

export { todoController };
