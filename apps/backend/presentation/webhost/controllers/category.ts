import type { Request, Response } from 'express';
import CategoryService from "#application/services/Category.ts";
import ApiError from "#webhost/errors/apiError.ts";


class CategoryController {
    private categoryService: CategoryService;
    constructor(categoryService = new CategoryService()) {
        this.categoryService = categoryService;
    };

    public async getAllCategories(req: Request, res: Response): Promise<any> {
        try {
            const allCategories = await this.categoryService.getAllCategories();

            res.json(allCategories);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async createCategory(req: Request, res: Response): Promise<any> {
        try {
            const name = req.body.name;

            const category = await this.categoryService.createCategory(name);

            res.status(201).json(category);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async getCategory(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;

            const category = await this.categoryService.getCategory(id);

            res.status(200).json(category);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async updateCategory(req: Request, res: Response): Promise<any> {
        try {
            const command = {
                id: req.params.id,
                name: req.body.name,
            };

            const updatedCategory = await this.categoryService.updateCategory(command.id, command.name);

            res.status(200).json(updatedCategory);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async deleteCategory(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;

            await this.categoryService.deleteCategory(id);

            res.status(204).send();
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };
}

export default new CategoryController();