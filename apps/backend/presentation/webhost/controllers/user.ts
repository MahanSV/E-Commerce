import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import UserService from '#application/services/userServices/UserService.ts';


class UserController {
    private userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    };

    public async getAllUsers(req: Request, res: Response): Promise<any> {};

    public async createUser(req: Request, res: Response): Promise<any> {
        const { email, password, role } = req.body;
    };

    public async getUser(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };

    public async updateUser(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { email, password, role } = req.body;
    };

    public async deleteUser(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };

    public async getUserByEmail(req: Request, res: Response): Promise<any> {
        const { email } = req.params;
    };
}

export default new UserController();