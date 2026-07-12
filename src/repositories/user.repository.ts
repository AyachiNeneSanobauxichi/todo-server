import type { User } from "@/models";
import { UserModel } from "@/models";

const userRepository = {
  findUserByUsername: (username: string) => {
    return UserModel.findOne({ username }).select("+password");
  },

  findUserByIdentifier: (identifier: string) => {
    return UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    }).select("+password");
  },

  createUser: (data: Pick<User, "username" | "email" | "password">) => {
    return UserModel.create(data);
  },
};

export { userRepository };
