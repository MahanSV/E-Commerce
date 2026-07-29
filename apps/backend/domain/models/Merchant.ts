import BaseModel from "#models/base/baseModel.ts";
import MerchantProduct, { MerchantProductSnapshotParams} from "#models/MerchantProduct.ts";

export interface MerchantConstructorParams {
    id: string;
    name: string;
    description?: string;
    email?: string;
    mobile?: string;
    address?: string;
    status: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MerchantSnapshotParams {
    id: string;
    name: string;
    description?: string;
    email?: string;
    mobile?: string;
    address?: string;
    status: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    merchantProducts?: MerchantProductSnapshotParams[];
}

class Merchant extends BaseModel {
    private _name!: string;
    private _description?: string;
    private _email?: string;
    private _mobile?: string;
    private _address?: string;
    private _status!: string;
    private _password!: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;
    private _merchantProducts?: MerchantProduct[];

    static create(params: MerchantConstructorParams): Merchant {
        const merchant = new Merchant();

        if(params?.id) {
            merchant.id = params?.id
        }

        merchant.name = params.name;
        merchant.description = params.description;
        merchant.email = params.email;
        merchant.mobile = params.mobile;
        merchant.address = params.address;
        merchant.status = params.status;
        merchant.password = params.password;
        merchant.createdAt = params.createdAt;
        merchant.updatedAt = params.updatedAt;

        return merchant;
    };

    static createFromSnapshot(snapshot: MerchantSnapshotParams): Merchant {
        const merchant = new Merchant();

        merchant.id = snapshot.id;
        merchant.name = snapshot.name;
        merchant.description = snapshot.description;
        merchant.email = snapshot.email;
        merchant.mobile = snapshot.mobile;
        merchant.address = snapshot.address;
        merchant.status = snapshot.status;
        merchant.password = snapshot.password;
        merchant.createdAt = snapshot.createdAt;
        merchant.updatedAt = snapshot.updatedAt;
        merchant.merchantProducts = snapshot.merchantProducts ? snapshot.merchantProducts.map(data => MerchantProduct.createFromSnapshot(data)) : [];

        return merchant;
    }

    public get name() {
        return this._name;
    }
    public set name(value) {
        this._name = value;
    }

    public get description() {
        return this._description;
    }
    public set description(value) {
        this._description = value;
    }

    public get email() {
        return this._email;
    }
    public set email(value) {
        this._email = value;
    }

    public get mobile() {
        return this._mobile;
    }
    public set mobile(value) {
        this._mobile = value;
    }

    public get address() {
        return this._address;
    }
    public set address(value) {
        this._address = value;
    }

    public get status() {
        return this._status;
    }
    public set status(value) {
        this._status = value;
    }

    public get password() {
        return this._password;
    }
    public set password(value) {
        this._password = value;
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

    public get merchantProducts() {
        return this._merchantProducts;
    }
    public set merchantProducts(value) {
        this._merchantProducts = value;
    }

}

export default Merchant;