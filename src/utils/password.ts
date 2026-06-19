import bcrypt from "bcryptjs";

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export { hashPassword, comparePassword };
