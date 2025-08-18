import type { User} from  '../domain/user';

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    create(passwordHash: string, number: string): Promise<User>;
    delete(id: string): Promise<string>;
    findAll(): Promise<string>;
}
