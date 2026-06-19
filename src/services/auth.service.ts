import { userRepository } from "@/repositories";
import { hashPassword, comparePassword } from "@/utils";
import { signAccessToken } from "@/utils";

const authService = {
  async register(username: string, password: string) {
    const existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser({
      username,
      password: hashedPassword,
    });

    return { id: user._id.toString(), userName: user.username };
  },

  async login(username: string, password: string) {
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Username or password is incorrect");
    }
    const accessToken = signAccessToken({
      userId: user._id.toString(),
      username: user.username,
    });

    return { accessToken };
  },
};

export { authService };
