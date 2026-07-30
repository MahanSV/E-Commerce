import prisma from '#context/dbContext/prisma/client.ts';
import Product from '#models/Product.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {ProductRepositoryInterface} from "#domain/interfaces/ProductRepository.ts";


export default class ProductRepository extends BaseRepository<Product> implements ProductRepositoryInterface {
    constructor() {
        super(Product.createFromSnapshot);
    };
};