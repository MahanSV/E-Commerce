import Product from "#models/Product.ts";
import {createProductCommand} from "#application/types/product/command.ts";


export class ProductFactory {
  /**
   * Creates a new Product entity
   */
  public static create(command: createProductCommand): Product {
    // Add any domain logic or validation here before creating the entity

    return Product.create({
        id : crypto.randomUUID(), // Generate ID if isn't provided
        categoryId: command.categoryId,
        title: command.title,
        slug: command.slug,
        mainImage: command.mainImage,
        manufacturer: command.manufacturer,
        photo: command.photo,
        inStock: command.inStock || 1,
        price: command.price || 0,
        rating: command.rating || 0,
        quantity: command.quantity || 0,
    });
  };
}