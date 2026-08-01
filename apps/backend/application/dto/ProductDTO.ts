
export interface ProductDTO {
    id: string;
    categoryId: string;
    title: string;
    slug: string;
    manufacturer: string;
    photo?: any[];
    inStock: boolean;
    price: number;
    rating: number;
    quantity: number;
    SKU?: string;
    socialLink?: string;
    description?: string;
    information?: string;
    wishlists?: WishlistDTO[];
    merchantProducts?: MerchantProductDTO[];
    category: CategoryDTO;
    orderItems?: OrderItemDTO[];
}

export interface ProductImageDTO {
    productID: string;
    imageID: string;
    image: string;
}