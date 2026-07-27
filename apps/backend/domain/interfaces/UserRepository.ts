import User from "#models/User.ts";

export interface UserRepositoryInterface {
    checkUserExistenceByNationalId(nationalId: string | null): Promise<User | null>;
    getUserById(userId: string): Promise<User | null>;
    getUserByNationalId(nationalId: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    createUser(userModel: User): Promise<User>;
}
