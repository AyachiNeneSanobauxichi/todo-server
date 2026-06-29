import { Todo } from "@/models";

type TodoPayload = Pick<Todo, "name" | "content" | "type" | "status">;

type TodoSortField = "createdAt" | "updatedAt" | "type" | "status";

type SortOrder = "asc" | "desc";

type TodoQueryOptions = {
  pageNumber: number;
  pageSize: number;
  todoName?: string;
  todoType?: string;
  todoStatus?: Todo["status"];
  sortBy?: TodoSortField;
  sortOrder?: SortOrder;
};

export type { TodoPayload, TodoSortField, SortOrder, TodoQueryOptions };
