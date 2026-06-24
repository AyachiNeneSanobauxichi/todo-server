import Router from "@koa/router";
import { todoController } from "@/controllers";

const todoRouter = new Router({ prefix: "/todo" });

todoRouter.post("/create", todoController.createTodo);
todoRouter.post("/todo-list", todoController.getTodoList);
todoRouter.get("/todo-detail", todoController.getTodoById);
todoRouter.patch("/update", todoController.updateTodo);
todoRouter.delete("/delete", todoController.deleteTodo);

export { todoRouter };
