import { Todo } from "@/models";

type TodoPayload = Pick<Todo, "name" | "content" | "type" | "status">;

export type { TodoPayload };
