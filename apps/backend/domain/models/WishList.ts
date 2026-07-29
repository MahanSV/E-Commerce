import BaseModel from '#models/base/baseModel.ts';
import User, { UserSnapshotParams } from "#models/User.ts";
import Product, {ProductSnapshotParams} from "#models/Product.ts";


export interface WishListConstructorParams {
    id: string;
    userId: string;
    productId: string;
}

export interface WishListSnapshotParams {
    id: string;
    userId: string;
    productId: string;
    user: UserSnapshotParams;
    product: ProductSnapshotParams;
}

class WishList extends BaseModel {
    private _userId!: string;
    private _productId!: string;
    private _user!: User;
    private _product!: Product;

    constructor() {
        super();
    };

    static create(params: WishListConstructorParams): WishList {
        const wishList = new WishList();

        if(params?.id){
            wishList.id = params?.id
        }

        wishList.userId = params.userId;
        wishList.productId = params.productId;

        return wishList;
    };

    static createFromSnapshot(snapshot: WishListSnapshotParams): WishList {
        const wishList = new WishList();

        wishList.id = snapshot.id;
        wishList.userId = snapshot.userId;
        wishList.productId = snapshot.productId;
        wishList.user = snapshot.user;
        wishList.product = snapshot.product;

        return wishList;
    }

    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get productId(): string {
        return this._productId;
    }
    public set productId(value: string) {
        this._productId = value;
    }

    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }

    public get product(): Product {
        return this._product;
    }
    public set product(value: Product) {
        this._product = value;
    }

}

export default WishList;