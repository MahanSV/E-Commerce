

export type createProductCommand = {
    merchantId: string;
    slug: string;
    title: string;
    mainImage: string;
    photo?: Array<{imageID: string, image: string}>;
    price: number;
    description: string;
    manufacturer: string;
    categoryId: string;
    inStock?: number;
};

export type updateProductCommand = {
    id: string;
    merchantId: string;
    slug: string;
    title: string;
    mainImage: string;
    photo?: Array<{imageID: string, image: string}>;
    price: number;
    description: string;
    manufacturer: string;
    categoryId: string;
    inStock?: number;
};

export type createProductImageCommand = {
    id: string;
    photo: string;
};

export type createImageCommand = {
    id: string;
    photo: Array<{
        imageID: string, image: string
    }>
};

export type updateProductImageCommand = {
    id: string;
    productID: string;
    image: string;
};