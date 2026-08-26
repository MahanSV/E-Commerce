
export type updateBatchItemsCommand = {
    batchId: string;
    items: {
        itemId: string;
        price: number;
        inStock: number;
    }[]
};