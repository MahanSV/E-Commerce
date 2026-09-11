import BaseModel from "#models/base/baseModel.ts";
import Product, {ProductSnapshotParams} from "#models/Product.ts";
import BulkUploadBatch, {BulkUploadBatchSnapshotParams} from "#models/BulkUploadBatch.ts";
import {BulkUploadItemStatus} from "#domain/enums/bulkUploadItemStatus.ts";


export interface BulkUploadItemConstructorParams {
    id: string;
    batchId: string;
    productId: string;
    title: string;
    slug: string;
    price: number;
    manufacturer?: string;
    description?: string;
    mainImage?: string;
    categoryId: string;
    inStock: number;
    status: BulkUploadItemStatus;
    error?: string;
}

export interface BulkUploadItemSnapshotParams {
    id: string;
    batchId: string;
    productId: string;
    title: string;
    slug: string;
    price: number;
    manufacturer?: string;
    description?: string;
    mainImage?: string;
    categoryId: string;
    inStock: number;
    status: BulkUploadItemStatus;
    error?: string;
    batch?: BulkUploadBatchSnapshotParams;
    product?: ProductSnapshotParams;
}

class BulkUploadItem extends BaseModel {
    private _batchId!: string;
    private _productId!: string;
    private _title!: string;
    private _slug!: string;
    private _price!: number;
    private _manufacturer?: string;
    private _description?: string;
    private _mainImage?: string;
    private _categoryId!: string;
    private _inStock!: number;
    private _status!: BulkUploadItemStatus;
    private _error?: string;
    private _batch?: BulkUploadBatch;
    private _product?: Product;

    constructor() {
        super();
    };

    static create(params: BulkUploadItemConstructorParams) {
        const bulkUploadItem = new BulkUploadItem();

        if(params?.id) {
            bulkUploadItem.id = params?.id
        }

        bulkUploadItem.batchId = params.batchId;
        bulkUploadItem.productId = params.productId;
        bulkUploadItem.title = params.title;
        bulkUploadItem.slug = params.slug;
        bulkUploadItem.price = params.price;
        bulkUploadItem.manufacturer = params.manufacturer;
        bulkUploadItem.description = params.description;
        bulkUploadItem.mainImage = params.mainImage;
        bulkUploadItem.categoryId = params.categoryId;
        bulkUploadItem.inStock = params.inStock;
        bulkUploadItem.status = params.status;
        bulkUploadItem.error = params.error;

        return bulkUploadItem;
    };

    static createFromSnapshot(snapshot: BulkUploadItemSnapshotParams) {
        const bulkUploadItem = new BulkUploadItem();

        bulkUploadItem.id = snapshot.id;
        bulkUploadItem.batchId = snapshot.batchId;
        bulkUploadItem.productId = snapshot.productId;
        bulkUploadItem.title = snapshot.title;
        bulkUploadItem.slug = snapshot.slug;
        bulkUploadItem.price = snapshot.price;
        bulkUploadItem.manufacturer = snapshot.manufacturer;
        bulkUploadItem.description = snapshot.description;
        bulkUploadItem.mainImage = snapshot.mainImage;
        bulkUploadItem.categoryId = snapshot.categoryId;
        bulkUploadItem.inStock = snapshot.inStock;
        bulkUploadItem.status = snapshot.status;
        bulkUploadItem.error = snapshot.error;
        bulkUploadItem.batch = snapshot.batch ? BulkUploadBatch.createFromSnapshot(snapshot.batch): undefined;
        bulkUploadItem.product = snapshot.product ? Product.createFromSnapshot(snapshot.product): undefined;

        return bulkUploadItem;
    };


    public get batchId() {
        return this._batchId;
    }
    public set batchId(value) {
        this._batchId = value;
    }

    public get productId() {
        return this._productId;
    }
    public set productId(value) {
        this._productId = value;
    }

    public get title() {
        return this._title;
    }
    public set title(value) {
        this._title = value;
    }

    public get slug() {
        return this._slug;
    }
    public set slug(value) {
        this._slug = value;
    }

    public get price() {
        return this._price;
    }
    public set price(value) {
        this._price = value;
    }

    public get manufacturer() {
        return this._manufacturer;
    }
    public set manufacturer(value) {
        this._manufacturer = value;
    }

    public get description() {
        return this._description;
    }
    public set description(value) {
        this._description = value;
    }

    public get mainImage() {
        return this._mainImage;
    }
    public set mainImage(value) {
        this._mainImage = value;
    }

    public get categoryId() {
        return this._categoryId;
    }
    public set categoryId(value) {
        this._categoryId = value;
    }

    public get inStock() {
        return this._inStock;
    }
    public set inStock(value) {
        this._inStock = value;
    }

    public get status() {
        return this._status;
    }
    public set status(value) {
        this._status = value;
    }

    public get error() {
        return this._error;
    }
    public set error(value) {
        this._error = value;
    }

    public get batch() {
        return this._batch;
    }
    public set batch(value) {
        this._batch = value;
    }

    public get product() {
        return this._product;
    }
    public set product(value) {
        this._product = value;
    }
}

export default BulkUploadItem;