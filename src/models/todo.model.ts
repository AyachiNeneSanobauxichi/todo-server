import type { InferSchemaType } from "mongoose";
import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
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

type Todo = InferSchemaType<typeof todoSchema>;
const TodoModel = model<Todo>("Todo", todoSchema);

export type { Todo };
export { TodoModel };
