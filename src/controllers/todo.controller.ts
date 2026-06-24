import type { Context } from "koa";
import { CreateTodoDTO } from "@/interfaces";
import { todoService } from "@/services";
import { success } from "@/utils";

const todoController = {
  async createTodo(ctx: Context) {
    const todoPayload = ctx.request.body as CreateTodoDTO;
    const data = await todoService.createTodo(todoPayload);
    success(ctx, data);
  },

  async getTodoList(ctx: Context) {
    // const { name, password } = ctx.request.body as LoginDTO;
    // const data = await authService.register(username, password);
    // success(ctx, data);
  },

  async getTodoById(ctx: Context) {
    // const { name, password } = ctx.request.body as LoginDTO;
    // const data = await authService.register(username, password);
    // success(ctx, data);
  },

  async updateTodo(ctx: Context) {
    // const { name, password } = ctx.request.body as LoginDTO;
    // const data = await authService.register(username, password);
    // success(ctx, data);
  },

  async deleteTodo(ctx: Context) {
    // const { name, password } = ctx.request.body as LoginDTO;
    // const data = await authService.register(username, password);
    // success(ctx, data);
  },
};

export { todoController };
