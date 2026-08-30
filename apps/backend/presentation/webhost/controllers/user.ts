import type { Request, Response } from 'express';
import UserService from '#application/services/UserService.ts';
import ApiError from "#webhost/errors/apiError.ts";


class UserController {
    private userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    };

    public async getAllUsers(req: Request, res: Response): Promise<any> {
        try {
            const users = await this.userService.getAllUsers();

            res.json(users);
        } catch (error) {
            throw error;
        }
    };

    public async createUser(req: Request, res: Response): Promise<any> {
        /*const { email, password, role } = req.body;*/
        try {
            const command = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            };

            const user = await this.userService.createUser(command);

            res.status(201).json(user);
        } catch (error) {
            throw error;
        }
    };

    public async getUser(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            const user = await this.userService.getUser(id);

            res.json(user);
        } catch (error) {
            throw error;
        }
    };

    public async updateUser(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
        const { email, password, role } = req.body;*/
        try {
            const command = {
                id: req.params.id,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            };

            const user = await this.userService.updateUser(command);

            res.json(user);
        } catch (error) {
            throw error;
        }
    };

    public async deleteUser(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            const user = await this.userService.deleteUser(id);

            res.status(204).send();
        } catch (error) {
            throw error;
        }
    };

    public async getUserByEmail(req: Request, res: Response): Promise<any> {
        /*const { email } = req.params;*/
        try {
            const email = req.params.email;

            const user = await this.userService.getUserByEmail(email);

            res.json(user);
        } catch (error) {
            throw error;
        }
    };
}

export default new UserController();