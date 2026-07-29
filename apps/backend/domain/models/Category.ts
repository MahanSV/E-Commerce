import BaseModel from "#models/base/baseModel.ts";

export interface CategoryConstructorParams {
    id: string;
    name: string;
    icon?: string;
    products: ProductConstructorParams[];
}

export interface CategorySnapshotParams {
    id: string;
    name: string;
    icon?: string;
    products?: ProductSnapshotParams[];
}


class Category extends BaseModel {
    private _name!: string;
    private _icon?: string;
    private _products?: Product[];

    constructor() {
        super();
    };

    static create(params: CategoryConstructorParams): Category {
        const category = new Category();

        if(params?.id){
            category.id = params?.id;
        }

        category.name = params.name;
        category.icon = params.icon;

        return category;
    }

    static createFromSnapshot(snapshot: CategorySnapshotParams): Category {
        const category = new Category();

        category.id = snapshot.id;
        category.name = snapshot.name;
        category.icon = snapshot.icon;
        category.products = snapshot.products ? snapshot.products.map(data => Product.createFromSnapshot(data)) : null;

        return category;
    }

    public get name() {
        return this._name;
    }
    public set name(value) {
        this._name = value;
    }

    public get icon() {
        return this._icon;
    }
    public set icon(value) {
        this._icon = value;
    }

    public get products() {
        return this._products;
    }
    public set products(value) {
        this._products = value;
    }
}

export default Category;