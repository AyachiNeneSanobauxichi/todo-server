import type { Context } from "koa";
import type {
  CreateTodoDTO,
  UpdateTodoDTO,
  CheckTodoIdDTO,
  TodoQueryOptionsDTO,
} from "@/interfaces";
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
    const { id } = ctx.params as CheckTodoIdDTO;
    const data = await todoService.getTodoById(userId, id);
    success(ctx, data, "get todo successfully");
  },

  async getTodoList(ctx: Context) {
    const userId = ctx.state.user.userId;
    const options = ctx.request.body as TodoQueryOptionsDTO;
    const data = await todoService.getTodoList(userId, options);
    success(ctx, data, "get todo list successfully");
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
    const { id } = ctx.params as CheckTodoIdDTO;
    const data = await todoService.deleteTodo(userId, id);
    success(ctx, data, "Todo deleted successfully");
  },
};

export { todoController };
