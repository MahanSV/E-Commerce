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
        /*const { email, password, role } = req.body;*/
        const command = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        };
    };

    public async getUser(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        const id = req.params.id;
    };

    public async updateUser(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
        const { email, password, role } = req.body;*/
        const command = {
            id: req.params.id,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        };
    };

    public async deleteUser(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        const id = req.params.id;
    };

    public async getUserByEmail(req: Request, res: Response): Promise<any> {
        /*const { email } = req.params;*/
        const email = req.params.email;
    };
}

export default new UserController();