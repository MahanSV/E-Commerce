import prisma from '#context/dbContext/prisma/client.ts';
import Product from '#models/Product.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {ProductRepositoryInterface} from "#domain/interfaces/ProductRepository.ts";
import {createImageCommand, updateProductCommand} from "#application/types/product/command.ts";


export default class ProductRepository extends BaseRepository<Product> implements ProductRepositoryInterface {
    constructor() {
        super(Product.createFromSnapshot);
    };

    async getProductBySlug(slug: string): Promise<Product[]> {
        const dataModels = await prisma.product.findMany({
            where: {
                slug
            },
            include: {
                category: true,
                merchantProducts: true,
            }
        });

        return dataModels.map(data => Product.createFromSnapshot(data));
    };

    async searchProducts(query: any): Promise<Product[]> {
        const dataModels = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query
                        }
                    },
                    {
                        description: {
                            contains: query
                        }
                    }
                ]
            },
            include: {
                merchantProducts: true,
            }
        });

        return dataModels?.map(data => Product.createFromSnapshot(data));
    };

    async getAllProducts(): Promise<Product[]> {
        const dataModels = await prisma.product.findMany({
            include: {
            merchantProducts: true,
        }
        });

        return dataModels?.map(data => Product.createFromSnapshot(data));
    };


    async createProduct(productModel: Product): Promise<Product> {
        const dataModel = await prisma.product.create({
            data: {
                id: productModel?.id,
                categoryId: productModel?.categoryId,
                title: productModel?.title,
                slug: productModel?.slug,
                mainImage: productModel?.mainImage,
                manufacturer: productModel?.manufacturer,
                photo: productModel?.photo,
                inStock: productModel?.inStock,
                price: productModel?.price,
                rating: productModel?.rating,
                quantity: productModel?.quantity,
            }
        });

        return dataModel && Product.createFromSnapshot(dataModel);
    }

    async getProductById(id: string): Promise<Product | null> {
        const dataModel = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: true,
                merchantProducts: true,
            }
        });

        return dataModel && Product.createFromSnapshot(dataModel);
    };

    async updateProduct(command: updateProductCommand): Promise<Product> {
        const dataModel = await prisma.product.update({
            where: {
                id: command.id
            },
            data: {
                id: command.id,
                slug: command.slug,
                title: command.title,
                photo: command.photo,
                price: command.price,
                description: command.description,
                manufacturer: command.manufacturer,
                categoryId: command.categoryId,
                inStock: command.inStock,
            }
        });

        return dataModel && Product.createFromSnapshot(dataModel);
    };


    async deleteProduct(id: string): Promise<Product> {
        const dataModel = await prisma.product.delete({
            where: {
                id
            }
        });

        return dataModel && Product.createFromSnapshot(dataModel);
    };

    async updateProductImage(command: createImageCommand): Promise<Product> {
        const dataModel = await prisma.product.update({
            where: {
                id: command.id
            },
            data: {
                photo: command.photo,
            }
        });

        return dataModel && Product.createFromSnapshot(dataModel);
    };

    async deleteProductImage(id: string): Promise<Product> {
        const dataModel = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                photo: undefined,
            }
        });

        return dataModel && Product.createFromSnapshot(dataModel);
    };
};