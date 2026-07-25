import httpStatus from 'http-status';
import type { Request, Response } from 'express';


class CategoryController {
    constructor() {};

    public async getAllCategories(req: Request, res: Response): Promise<any> {};
    public async createCategory(req: Request, res: Response): Promise<any> {};
    public async getCategory(req: Request, res: Response): Promise<any> {};
    public async updateCategory(req: Request, res: Response): Promise<any> {};
    public async deleteCategory(req: Request, res: Response): Promise<any> {};
}

export default new CategoryController();