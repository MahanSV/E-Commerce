

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
    inStock: number;
    rating?: number;
    quantity?: number;
}

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


// تایپ برای عملگرهای مجاز
export type FilterOperator = 'gte' | 'lte' | 'gt' | 'lt' | 'equals' | 'contains';

// تایپ برای آبجکت فیلتر ساخته شده
export type FilterObject = {
    price?: { [K in FilterOperator]?: number };
    rating?: { [K in FilterOperator]?: number };
    inStock?: { [K in FilterOperator]?: number };
    outOfStock?: { [K in FilterOperator]?: number };
    category?: { [K in FilterOperator]?: string };
}

// تایپ پارامترهای ورودی متد getFilteredProducts
export type GetFilteredProductsParams = {
    page: number;
    filterObj: FilterObject;
    sortByValue: string;
}