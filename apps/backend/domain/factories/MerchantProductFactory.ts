import MerchantProduct from '#models/MerchantProduct.ts';


export class MerchantProductFactory {
  /**
   * Creates a new Product entity
   */
  public static create(merchantId: string, productId: string): MerchantProduct {
    // Add any domain logic or validation here before creating the entity

    return MerchantProduct.create({
        id : crypto.randomUUID(), // Generate ID if isn't provided
        merchantId: merchantId,
        productId: productId,
    });
  };
}