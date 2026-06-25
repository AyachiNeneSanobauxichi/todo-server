import Router from "@koa/router";
import { todoController } from "@/controllers";
import { authMiddleware, validate, ValidateType } from "@/middlewares";
import { todoSchema, updateTodoSchema, checkTodoIdSchema } from "@/validators";

const todoRouter = new Router({ prefix: "/todo" });
todoRouter.use(authMiddleware.verifyToken);

todoRouter.post("/create", validate(todoSchema), todoController.createTodo);
todoRouter.post("/todo-list", todoController.getTodoList);
todoRouter.get(
  "/todo-detail/:id",
  validate(checkTodoIdSchema, ValidateType.PARAMS),
  todoController.getTodoById,
);
todoRouter.patch(
  "/update",
  validate(updateTodoSchema),
  todoController.updateTodo,
);
todoRouter.delete(
  "/delete/:id",
  validate(checkTodoIdSchema, ValidateType.PARAMS),
  todoController.deleteTodo,
);

export { todoRouter };
