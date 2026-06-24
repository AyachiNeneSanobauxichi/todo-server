import Router from "@koa/router";
import { todoController } from "@/controllers";
import { authMiddleware, validate } from "@/middlewares";
import { todoSchema } from "@/validators";

const todoRouter = new Router({ prefix: "/todo" });
todoRouter.use(authMiddleware.verifyToken);

todoRouter.post("/create", validate(todoSchema), todoController.createTodo);
todoRouter.post("/todo-list", todoController.getTodoList);
todoRouter.get("/todo-detail", todoController.getTodoById);
todoRouter.patch("/update", todoController.updateTodo);
todoRouter.delete("/delete", todoController.deleteTodo);

export { todoRouter };
