import prisma from '#context/dbContext/prisma/client.ts';
import Category from "#models/Category.ts";
import type { CategoryRepositoryInterface } from "#domain/interfaces/CategoryRepository.ts";
import {BaseRepository} from "#repositories/BaseRepository.ts";

export default class CategoryRepository extends BaseRepository<Category> implements CategoryRepositoryInterface {
    constructor() {
        super(Category.createFromSnapshot);
    };

    async getCategoryById(id: string): Promise<Category | null> {
        const dataModel = await prisma.category.findUnique({
            where: {id}
        });

        return dataModel && Category.createFromSnapshot(dataModel);
    };


    async getAllCategories(): Promise<Category[]> {
        const dataModels = await prisma.category.findMany();

        return dataModels.map(data => Category.createFromSnapshot(data));
    };

    async createCategory(name: string): Promise<Category> {
        const dataModel = await prisma.category.create({
            data: {
                name: name,
            }
        });

        return dataModel && Category.createFromSnapshot(dataModel);
    };

    async updateCategory(id:string, name: string): Promise<Category> {
        const dataModel = await prisma.category.update({
            where: {
                id
            },
            data: {
                name: name
            }
        });

        return dataModel && Category.createFromSnapshot(dataModel);
    }

    async deleteCategory(id:string): Promise<Category> {
        const dataModel = await prisma.category.delete({
            where: {id}
        });

        return dataModel && Category.createFromSnapshot(dataModel);
    };
};