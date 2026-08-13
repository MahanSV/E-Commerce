import BaseModel from '#models/base/baseModel.ts';
import User, {UserSnapshotParams} from "#models/User.ts";
import OrderItem, {OrderItemSnapshotParams} from "#models/OrderItem.ts";

export interface OrderConstructorParams {
    id: string;
    userId: string;
    status: string;
    isActive: boolean;
    companyName?: string;
    address?: string;
    apartment?: string;
    postalCode?: string;
    country?: string;
    city?: string;
    description?: string;
    total: number;
    deliversAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface OrderSnapshotParams {
    id: string;
    userId: string;
    status: string;
    isActive: boolean;
    companyName?: string;
    address?: string;
    apartment?: string;
    postalCode?: string;
    country?: string;
    city?: string;
    description?: string;
    total: number;
    deliversAt: Date;
    createdAt: Date;
    updatedAt: Date;
    user: UserSnapshotParams;
    orderItems?: OrderItemSnapshotParams[];
}

class Order extends BaseModel {
    private _userId!: string;
    private _status!: string;
    private _isActive!: boolean;
    private _companyName?: string;
    private _address?: string;
    private _apartment?: string;
    private _postalCode?: string;
    private _country?: string;
    private _city?: string;
    private _description?: string;
    private _total!: number;
    private _deliversAt!: Date;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _user!: User;
    private _orderItems?: OrderItem[]

    constructor() {
        super();
    };

    static create(params: OrderConstructorParams): Order {
        const order = new Order();

        if(params?.id) {
            order.id = params?.id
        }

        order.userId = params.userId;
        order.status = params.status;
        order.isActive = params.isActive;
        order.companyName = params.companyName;
        order.address = params.address;
        order.apartment = params.apartment;
        order.postalCode = params.postalCode;
        order.country = params.country;
        order.city = params.city;
        order.description = params.description;
        order.total = params.total;
        order.deliversAt = params.deliversAt;
        order.createdAt = params.createdAt;
        order.updatedAt = params.updatedAt;

        return order;
    }
    static createFromSnapshot(snapshot: OrderSnapshotParams): Order {
        const order = new Order();

        order.id = snapshot.id;
        order.userId = snapshot.userId;
        order.status = snapshot.status;
        order.isActive = snapshot.isActive;
        order.companyName = snapshot.companyName;
        order.address = snapshot.address;
        order.apartment = snapshot.apartment;
        order.postalCode = snapshot.postalCode;
        order.country = snapshot.country;
        order.city = snapshot.city;
        order.description = snapshot.description;
        order.total = snapshot.total;
        order.deliversAt = snapshot.deliversAt;
        order.createdAt = snapshot.createdAt;
        order.updatedAt = snapshot.updatedAt;
        order.user = snapshot.user && User.createFromSnapshot(snapshot.user);
        order.orderItems = snapshot.orderItems ? snapshot.orderItems.map(data => OrderItem.createFromSnapshot(data)) : [];

        return order;
    }

    public get userId() {
        return this._userId;
    }
    public set userId(value) {
        this._userId = value;
    }

    public get status() {
        return this._status;
    }
    public set status(value) {
        this._status = value;
    }

    public get isActive() {
        return this._isActive;
    }
    public set isActive(value) {
        this._isActive = value;
    }

    public get companyName() {
        return this._companyName;
    }
    public set companyName(value) {
        this._companyName = value;
    }

    public get address() {
        return this._address;
    }
    public set address(value) {
        this._address = value;
    }

    public get apartment() {
        return this._apartment;
    }
    public set apartment(value) {
        this._apartment = value;
    }

    public get postalCode() {
        return this._postalCode;
    }
    public set postalCode(value) {
        this._postalCode = value;
    }

    public get country() {
        return this._country;
    }
    public set country(value) {
        this._country = value;
    }

    public get city() {
        return this._city;
    }
    public set city(value) {
        this._city = value;
    }

    public get description() {
        return this._description;
    }
    public set description(value) {
        this._description = value;
    }

    public get total() {
        return this._total;
    }
    public set total(value) {
        this._total = value;
    }

    public get deliversAt() {
        return this._deliversAt;
    }
    public set deliversAt(value) {
        this._deliversAt = value;
    }

    public get createdAt() {
        return this._createdAt;
    }
    public set createdAt(value) {
        this._createdAt = value;
    }

    public get updatedAt() {
        return this._updatedAt;
    }
    public set updatedAt(value) {
        this._updatedAt = value;
    }

    public get user() {
        return this._user;
    }
    public set user(value) {
        this._user = value;
    }

    public get orderItems() {
        return this._orderItems;
    }
    public set orderItems(value) {
        this._orderItems = value;
    }
}

export default Order;