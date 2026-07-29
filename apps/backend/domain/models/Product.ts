import BaseModel from '#models/base/baseModel.ts';
import MerchantProduct, {
    MerchantProductSnapshotParams
} from "#models/MerchantProduct.ts";
import WishList, { WishListSnapshotParams} from "#models/WishList.ts";
import OrderItem, {OrderItemSnapshotParams} from "#models/OrderItem.ts";
import Category, {CategorySnapshotParams} from "#models/Category.ts";

export interface ProductConstructorParams {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    manufacturer: string;
    photo: string;
    inStock: boolean;
    price: number;
    rating: number;
    quantity: number;
    SKU?: string;
    socialLink?: string;
    description?: string;
    information?: string;
}

export interface ProductSnapshotParams {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    manufacturer: string;
    photo: string;
    inStock: boolean;
    price: number;
    rating: number;
    quantity: number;
    SKU?: string;
    socialLink?: string;
    description?: string;
    information?: string;
    wishlists: WishListSnapshotParams[];
    merchantProducts: MerchantProductSnapshotParams[];
    category: CategorySnapshotParams;
    orderItems: OrderItemSnapshotParams[];
}


class Product extends BaseModel {
    private _categoryId!: string;
    private _name!: string;
    private _slug!: string;
    private _manufacturer!: string;
    private _photo!: string;
    private _inStock!: boolean;
    private _price!: number;
    private _rating!: number;
    private _quantity!: number;
    private _SKU?: string;
    private _socialLink?: string;
    private _description?: string;
    private _information?: string;
    private _wishlists?: WishList[];
    private _merchantProducts?: MerchantProduct[];
    private _category!: Category;
    private _orderItems?: OrderItem[];

    constructor() {
        super();
    };

    static create(params: ProductConstructorParams): Product {
        const product = new Product();

        if(params?.id) {
            product.id = params?.id
        }

        product.categoryId = params.categoryId;
        product.name = params.name;
        product.slug = params.slug;
        product.manufacturer = params.manufacturer;
        product.photo = params.photo;
        product.inStock = params.inStock;
        product.price = params.price;
        product.rating = params.rating;
        product.quantity = params.quantity;
        product.SKU = params.SKU;
        product.socialLink = params.socialLink;
        product.description = params.description;
        product.information = params.information;

        return product;
    }

    static createFromSnapshot(snapshot: ProductSnapshotParams): Product {
        const product = new Product();

        product.id = snapshot.id;
        product.categoryId = snapshot.categoryId;
        product.name = snapshot.name;
        product.slug = snapshot.slug;
        product.manufacturer = snapshot.manufacturer;
        product.photo = snapshot.photo;
        product.inStock = snapshot.inStock;
        product.price = snapshot.price;
        product.rating = snapshot.rating;
        product.quantity = snapshot.quantity;
        product.SKU = snapshot.SKU;
        product.socialLink = snapshot.socialLink;
        product.description = snapshot.description;
        product.information = snapshot.information;
        product.category = snapshot.category && Category.createFromSnapshot(snapshot.category);
        product.wishlists = snapshot.wishlists ? snapshot.wishlists.map(data => WishList.createFromSnapshot(data)) : [];
        product.merchantProducts = snapshot.merchantProducts ? snapshot.merchantProducts.map(data => MerchantProduct.createFromSnapshot(data)): [];
        product.orderItems = snapshot.orderItems ? snapshot.orderItems.map(data => OrderItem.createFromSnapshot(data)) : [];

        return product;
    }

    public get categoryId() {
        return this._categoryId;
    }
    public set categoryId(value) {
        this._categoryId = value;
    }

    public get name() {
        return this._name;
    }
    public set name(value) {
        this._name = value;
    }

    public get slug() {
        return this._slug;
    }
    public set slug(value) {
        this._slug = value;
    }

    public get manufacturer() {
        return this._manufacturer;
    }
    public set manufacturer(value) {
        this._manufacturer = value;
    }

    public get photo() {
        return this._photo;
    }
    public set photo(value) {
        this._photo = value;
    }

    public get inStock() {
        return this._inStock;
    }
    public set inStock(value) {
        this._inStock = value;
    }

    public get price() {
        return this._price;
    }
    public set price(value) {
        this._price = value;
    }

    public get rating() {
        return this._rating;
    }
    public set rating(value) {
        this._rating = value;
    }

    public get quantity() {
        return this._quantity;
    }
    public set quantity(value) {
        this._quantity = value;
    }

    public get SKU() {
        return this._SKU;
    }
    public set SKU(value) {
        this._SKU = value;
    }

    public get socialLink() {
        return this._socialLink;
    }
    public set socialLink(value) {
        this._socialLink = value;
    }

    public get description() {
        return this._description;
    }
    public set description(value) {
        this._description = value;
    }

    public get category() {
        return this._category;
    }
    public set category(value) {
        this._category = value;
    }

    public get information() {
        return this._information;
    }
    public set information(value) {
        this._information = value;
    }

    public get wishlists() {
        return this._wishlists;
    }
    public set wishlists(value) {
        this._wishlists = value;
    }

    public get merchantProducts() {
        return this._merchantProducts;
    }
    public set merchantProducts(value) {
        this._merchantProducts = value;
    }

    public get orderItems() {
        return this._orderItems;
    }
    public set orderItems(value) {
        this._orderItems = value;
    }
}

export default Product;