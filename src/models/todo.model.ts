import type { InferSchemaType, PaginateModel } from "mongoose";
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const todoSchema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true, select: false },
    type: {
      type: String,
      enum: ["normal", "important", "urgent"],
      default: "normal",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "doing", "deleted"],
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

todoSchema.plugin(mongoosePaginate);

type Todo = InferSchemaType<typeof todoSchema>;
const TodoModel = model<Todo, PaginateModel<Todo>>("Todo", todoSchema);

export type { Todo };
export { TodoModel };
