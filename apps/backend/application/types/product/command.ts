

export type createProductCommand = {
    merchantId: string;
    slug: string;
    title: string;
    photo: string;
    price: number;
    description: string;
    manufacturer: string;
    categoryId: string;
    inStock?: boolean;
};

export type updateProductCommand = {
    id: string;
    merchantId: string;
    slug: string;
    title: string;
    photo: string;
    price: number;
    description: string;
    manufacturer: string;
    categoryId: string;
    inStock?: boolean;
};