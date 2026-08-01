

export type createProductCommand = {
    merchantId: string;
    slug: string;
    title: string;
    photo?: Array<{imageID: string, image: string}>;
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
    photo?: Array<{imageID: string, image: string}>;
    price: number;
    description: string;
    manufacturer: string;
    categoryId: string;
    inStock?: boolean;
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