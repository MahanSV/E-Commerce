import BaseModel from '#models/base/baseModel.ts';
import {UserType} from "#domain/enums/userType.ts";

export interface UserConstructorParams {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: UserType;
    mobile: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    /*orders?: OrderConstructorParams[];
    notifications?: NotificationConstructorParams[];
    wishlists?: WishListConstructorParams[];*/
}

export interface UserSnapshotParams {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: UserType;
    mobile: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    /*orders?: OrderSnapshotParams[];
    notifications?: NotificationSnapshotParams[];
    wishlists?: WishListSnapshotParams[];*/
}

class User extends BaseModel {
    private _name!: string;
    private _lastName!: string;
    private _email!: string;
    private _password!: string;
    private _role!: UserType;
    private _mobile!: string;
    private _status!: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;

    constructor() {
        super();
    };

    static create(params: UserConstructorParams) {
        const user = new User();

        if(params?.id){
            user.id = params?.id
        }

        user.name = params.name;
        user.lastName = params.lastName;
        user.email = params.email;
        user.password = params.password;
        user.role = params.role;
        user.mobile = params.mobile;
        user.status = params.status;
        user.createdAt = params.createdAt;
        user.updatedAt = params.updatedAt;

        return user;
    };

    static createFromSnapshot(snapshot: UserSnapshotParams) {
        const user = new User();

        user.id = snapshot.id;
        user.name = snapshot.name;
        user.lastName = snapshot.lastName;
        user.email = snapshot.email;
        user.password = snapshot.password;
        user.role = snapshot.role;
        user.mobile = snapshot.mobile;
        user.status = snapshot.status;
        user.createdAt = snapshot.createdAt;
        user.updatedAt = snapshot.updatedAt;
        // user.orders = snapshot.orders ? snapshot.orders.map(data => Order.createFromSnapshot(data)) ? [];
        // user.notifications = snapshot.notifications ? snapshot.notifications.map(data => Notification.createFromSnapshot(data)) ? [];
        // user.wishlists = snapshot.wishlists ? snapshot.wishlists.map(data => WishList.createFromSnapshot(data)) ? [];

        return user;
    };

    public get name(): string {
        return this._name;
    };
    public set name(value: string) {
        this._name = value;
    };

    public get lastName(): string {
        return this._lastName;
    };
    public set lastName(value: string) {
        this._lastName = value;
    };

    public get email(): string {
        return this._email;
    };
    public set email(value: string) {
        this._email = value;
    };

    public get password(): string {
        return this._password;
    };
    public set password(value: string) {
        this._password = value;
    };

    public get role(): UserType {
        return this._role;
    };
    public set role(value: UserType) {
        this._role = value;
    };

    public get mobile(): string {
        return this._mobile;
    };
    public set mobile(value: string) {
        this._mobile = value;
    };

    public get status(): string {
        return this._status;
    };
    public set status(value: string) {
        this._status = value;
    };

    public get createdAt(): Date | undefined {
        return this._createdAt;
    };
    public set createdAt(value: Date | undefined) {
        this._createdAt = value;
    };

    public get updatedAt(): Date | undefined {
        return this._updatedAt;
    };
    public set updatedAt(value: Date | undefined) {
        this._updatedAt = value;
    };

}

export default User;