import { User } from "../domain/user.domain";
import { ChangeUserNameInput, ChangeUserPasswordInput, CreateUserInput } from "./user.dto";

export interface UserService {
  createUser(input: CreateUserInput): Promise<User>;
  changeUserName(input: ChangeUserNameInput): Promise<void>;
  changeUserPassword(input: ChangeUserPasswordInput): Promise<void>;
  getUserById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}