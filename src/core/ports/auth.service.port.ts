import type { User } from '../domain/user';

export interface IAuthServicePort {
  loginOrRegister(idNumber: string, password: string): Promise<{ token: string }>;
  remove(idNumber: string): Promise<string>;
  getAllUsers(): Promise<string>;
}