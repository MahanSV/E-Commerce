import BaseModel from "#models/base/baseModel.ts";
import User, {UserSnapshotParams} from "#models/User.ts";
import BulkUploadItem, {BulkUploadItemSnapshotParams} from "#models/BulkUploadItem.ts";

export interface BulkUploadBatchConstructorParams {
    id: string;
    fileName?: string;
    createdAt: Date;
    status: string;
    itemCount: number;
    errorCount: number;
    userId?: string;
}

export interface BulkUploadBatchSnapshotParams {
    id: string;
    fileName?: string;
    createdAt: Date;
    status: string;
    itemCount: number;
    errorCount: number;
    userId?: string;
    items?: BulkUploadItemSnapshotParams[];
    user?: UserSnapshotParams;
}


class BulkUploadBatch extends BaseModel {
    private _fileName?: string;
    private _createdAt!: Date;
    private _status!: string;
    private _itemCount!: number;
    private _errorCount!: number;
    private _userId?: string;
    private _items?: BulkUploadItem[];
    private _user?: User;

    constructor() {
        super();
    };


    static create(params: BulkUploadBatchConstructorParams): BulkUploadBatch {
        const bulkUploadBatch = new BulkUploadBatch();

        if(params?.id) {
            bulkUploadBatch.id = params?.id
        }

        bulkUploadBatch.fileName = params.fileName;
        bulkUploadBatch.createdAt = params.createdAt;
        bulkUploadBatch.status = params.status;
        bulkUploadBatch.itemCount = params.itemCount;
        bulkUploadBatch.errorCount = params.errorCount;
        bulkUploadBatch.userId = params.userId;

        return bulkUploadBatch;
    };

    static createFromSnapshot(snapshot: BulkUploadBatchSnapshotParams): BulkUploadBatch {
        const bulkUploadBatch = new BulkUploadBatch();

        bulkUploadBatch.id = snapshot.id;
        bulkUploadBatch.fileName = snapshot.fileName;
        bulkUploadBatch.createdAt = snapshot.createdAt;
        bulkUploadBatch.status = snapshot.status;
        bulkUploadBatch.itemCount = snapshot.itemCount;
        bulkUploadBatch.errorCount = snapshot.errorCount;
        bulkUploadBatch.userId = snapshot.userId;
        bulkUploadBatch.user = snapshot.user ? User.createFromSnapshot(snapshot.user) : undefined;
        bulkUploadBatch.items = snapshot.items ? snapshot.items.map(data => BulkUploadItem.createFromSnapshot(data)) : [];

        return bulkUploadBatch;
    };

    public get fileName() {
        return this._fileName;
    }
    public set fileName(value) {
        this._fileName = value;
    }

    public get createdAt() {
        return this._createdAt;
    }
    public set createdAt(value) {
        this._createdAt = value;
    }

    public get status() {
        return this._status;
    }
    public set status(value) {
        this._status = value;
    }

    public get itemCount() {
        return this._itemCount;
    }
    public set itemCount(value) {
        this._itemCount = value;
    }

    public get errorCount() {
        return this._errorCount;
    }
    public set errorCount(value) {
        this._errorCount = value;
    }

    public get userId() {
        return this._userId;
    }
    public set userId(value) {
        this._userId = value;
    }

    public get user() {
        return this._user;
    }
    public set user(value) {
        this._user = value;
    }

    public get items() {
        return this._items;
    }
    public set items(value) {
        this._items = value;
    }
}

export default BulkUploadBatch;