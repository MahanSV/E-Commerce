import BaseModel from "#models/base/baseModel.ts";
import Merchant, {MerchantSnapshotParams} from "#models/Merchant.ts";
import Product, {ProductSnapshotParams} from "#models/Product.ts";

export interface MerchantProductConstructorParams {
    id: string;
    merchantId: string;
    productId: string;
}

export interface MerchantProductSnapshotParams {
    id: string;
    merchantId: string;
    productId: string;
    merchant: MerchantSnapshotParams;
    product: ProductSnapshotParams;
}

class MerchantProduct extends BaseModel {
    private _merchantId!: string;
    private _productId!: string;
    private _merchant!: Merchant;
    private _product!: Product;

    constructor() {
        super();
    };

    static create(params: MerchantProductConstructorParams): MerchantProduct {
        const merchantProduct = new MerchantProduct();

        if(params?.id) {
            merchantProduct.id = params?.id;
        }

        merchantProduct.merchantId = params.merchantId;
        merchantProduct.productId = params.productId;

        return merchantProduct;
    }


    static createFromSnapshot(snapshot: MerchantProductSnapshotParams): MerchantProduct {
        const merchantProduct = new MerchantProduct();

        merchantProduct.id = snapshot.id;
        merchantProduct.merchantId = snapshot.merchantId;
        merchantProduct.productId = snapshot.productId;
        merchantProduct.merchant = snapshot.merchant && Merchant.createFromSnapshot(snapshot.merchant);
        merchantProduct.product = snapshot.product && Product.createFromSnapshot(snapshot.product);

        return merchantProduct;
    }

    public get merchantId() {
        return this._merchantId;
    }
    public set merchantId(value) {
        this._merchantId = value;
    }

    public get productId() {
        return this._productId;
    }
    public set productId(value) {
        this._productId = value;
    }

    public get merchant() {
        return this._merchant;
    }
    public set merchant(value) {
        this._merchant = value;
    }

    public get product() {
        return this._product;
    }
    public set product(value) {
        this._product = value;
    }
}

export default MerchantProduct;