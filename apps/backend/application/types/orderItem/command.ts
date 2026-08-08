
export type createOrderItemCommand = {
    orderId: string;
    productId: string;
    quantity: number;
};

export type updateOrderItemCommand = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
};