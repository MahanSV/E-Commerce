
export interface ProductDTO {
    id: string;
    categoryId: string;
    title: string;
    slug: string;
    manufacturer: string;
    photo: string;
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
