import BaseModel from '#models/base/baseModel.ts';
import Order, {OrderSnapshotParams} from "#models/Order.ts";
import Product, {ProductSnapshotParams} from "#models/Product.ts";


export interface OrderItemConstructorParams {
    id: string
    orderId: string
    productId: string
    quantity: number;
    price: number;
}

export interface OrderItemSnapshotParams {
    id: string
    orderId: string
    productId: string
    quantity: number;
    price: number;
    order?:   OrderSnapshotParams;
    product?: ProductSnapshotParams;
}

class OrderItem extends BaseModel {
    private _orderId!: string
    private _productId!: string
    private _quantity!: number;
    private _price!: number;
    private _order?: Order
    private _product?: Product;

    constructor() {
        super();
    };

    static create(params: OrderItemConstructorParams): OrderItem {
        const orderItem = new OrderItem();

        if(params?.id) {
            orderItem.id = params?.id
        }

        orderItem.orderId = params.orderId;
        orderItem.productId = params.productId;
        orderItem.quantity = params.quantity;
        orderItem.price = params.price;

        return orderItem;
    };

    static createFromSnapshot(snapshot: OrderItemSnapshotParams): OrderItem {
        const orderItem = new OrderItem();

        orderItem.id = snapshot.id;
        orderItem.orderId = snapshot.orderId;
        orderItem.productId = snapshot.productId;
        orderItem.quantity = snapshot.quantity;
        orderItem.price = snapshot.price;
        orderItem.order = snapshot.order ? Order.createFromSnapshot(snapshot.order) : undefined;
        orderItem.product = snapshot.product ? Product.createFromSnapshot(snapshot.product) : undefined;

        return orderItem;
    };

    public get orderId() {
        return this._orderId;
    }
    public set orderId(value) {
        this._orderId = value;
    }

    public get productId() {
        return this._productId;
    }
    public set productId(value) {
        this._productId = value;
    }

    public get quantity() {
        return this._quantity;
    }
    public set quantity(value) {
        this._quantity = value;
    }

    public get price() {
        return this._price;
    }
    public set price(value) {
        this._price = value;
    }

    public get order() {
        return this._order;
    }
    public set order(value) {
        this._order = value;
    }

    public get product() {
        return this._product;
    }
    public set product(value) {
        this._product = value;
    }
}

export default OrderItem;