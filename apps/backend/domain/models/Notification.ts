import BaseModel from '#models/base/baseModel.ts';
import User, {UserSnapshotParams} from "#models/User.ts";


export interface NotificationConstructorParams {
    id: string;
    userId: string;
    title: string;
    description?: string;
    isRead: boolean;
    priority: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NotificationSnapshotParams {
    id: string;
    userId: string;
    title: string;
    description?: string;
    isRead: boolean;
    priority: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserSnapshotParams;
}

class Notification extends BaseModel {
    private _userId!: string;
    private _title!: string;
    private _description?: string;
    private _isRead!: boolean;
    private _priority!: string;
    private _type!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _user!: User;

    constructor() {
        super();
    };

    static create(params: NotificationConstructorParams): Notification {
        const notification = new Notification();

        if(params?.id) {
            notification.id = params?.id;
        }

        notification.userId = params.userId;
        notification.title = params.title;
        notification.description = params.description;
        notification.isRead = params.isRead;
        notification.priority = params.priority;
        notification.type = params.type;
        notification.createdAt = params.createdAt;
        notification.updatedAt = params.updatedAt;

        return notification;
    };

    static createFromSnapshot(snapshot: NotificationSnapshotParams): Notification {
        const notification = new Notification();

        notification.id = snapshot.id;
        notification.userId = snapshot.userId;
        notification.title = snapshot.title;
        notification.description = snapshot.description;
        notification.isRead = snapshot.isRead;
        notification.priority = snapshot.priority;
        notification.type = snapshot.type;
        notification.createdAt = snapshot.createdAt;
        notification.updatedAt = snapshot.updatedAt;
        notification.user = snapshot.user && User.createFromSnapshot(snapshot.user);

        return notification;
    }

    public get userId() {
        return this._userId;
    }
    public set userId(value) {
        this._userId = value;
    }

    public get title() {
        return this._title;
    }
    public set title(value) {
        this._title = value;
    }

    public get description() {
        return this._description;
    }
    public set description(value) {
        this._description = value;
    }

    public get isRead() {
        return this._isRead;
    }
    public set isRead(value) {
        this._isRead = value;
    }

    public get priority() {
        return this._priority;
    }
    public set priority(value) {
        this._priority = value;
    }

    public get type() {
        return this._type;
    }
    public set type(value) {
        this._type = value;
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
    public set user(value: User) {
        this._user = value;
    }
}

export default Notification;