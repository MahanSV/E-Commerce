import prisma from '#context/dbContext/prisma/client.ts';
import Category from "#models/Category.ts";
import type { CategoryRepositoryInterface } from "#domain/interfaces/CategoryRepository.ts";
import {BaseRepository} from "#repositories/BaseRepository.ts";

export default class CategoryRepository extends BaseRepository<Category> implements CategoryRepositoryInterface {
    constructor() {
        super(Category.createFromSnapshot);
    };
};