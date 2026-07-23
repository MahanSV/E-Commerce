import express from 'express';
import userRouter from '#routes/user.ts'
import productRouter from '#routes/products.ts';
import mainImageRouter from '#routes/productImages.ts';
import searchRouter from '#routes/search.ts';
import orderRouter from '#routes/customer_orders.ts';
import orderProductRouter from '#routes/customer_order_product.js';
import slugRouter from '#routes/slugs.ts';
import wishlistRouter from '#routes/wishlist.ts';
import notificationsRouter from '#routes/notifications.ts';
import merchantRouter from '#routes/merchant.ts';


const router = express.Router();

const routes = [
    {
        path: "/api/products",
        source: productRouter
    },
    /*{
        path: "/api/categories",
        source:
    },*/
    // {
    //     path: "/api/images",
    //     source:
    // },
    {
        path: "/api/main-image",
        source: mainImageRouter
    },
    {
        path: "/api/users",
        source: userRouter
    },
    {
        path: "/api/search",
        source: searchRouter
    },
    {
        path: "/api/orders",
        source: orderRouter
    },
    {
        path: "/api/order-product",
        source: orderProductRouter
    },
    {
        path: "/api/slugs",
        source: slugRouter
    },
    {
        path: "/api/wishlist",
        source: wishlistRouter
    },
    {
        path: "/api/notifications",
        source: notificationsRouter
    },
    {
        path: "/api/merchants",
        source: merchantRouter
    },
    /*{
        path: "/api/bulk-upload",
        source:
    },*/
];

routes.forEach((route) => {
    router.use(route.path, route.source);
});

export default router;
