import express from 'express';
import userRouter from '#routes/user.ts'
import productRouter from '#routes/products.ts';
import mainImageRouter from '#routes/productImages.ts';
import searchRouter from '#routes/search.ts';
import orderRouter from '#routes/customer_orders.ts';
import orderProductRouter from '#routes/customer_order_product.ts';
import slugRouter from '#routes/slugs.ts';
import wishlistRouter from '#routes/wishlist.ts';
import notificationsRouter from '#routes/notifications.ts';
import merchantRouter from '#routes/merchant.ts';
import productImagesRouter from '#routes/productImages.ts';
import bulkUploadRouter from '#routes/bulkUpload.ts';
import categoryRouter from '#routes/category.ts';


const router = express.Router();

const routes = [
    {
        path: "/products",
        source: productRouter
    },
    {
        path: "/categories",
        source: categoryRouter
    },
    {
        path: "/images",
        source: productImagesRouter
    },
    {
        path: "/main-image",
        source: mainImageRouter
    },
    {
        path: "/users",
        source: userRouter
    },
    {
        path: "/search",
        source: searchRouter
    },
    {
        path: "/orders",
        source: orderRouter
    },
    {
        path: "/order-product",
        source: orderProductRouter
    },
    {
        path: "/slugs",
        source: slugRouter
    },
    {
        path: "/wishlist",
        source: wishlistRouter
    },
    {
        path: "/notifications",
        source: notificationsRouter
    },
    {
        path: "/merchants",
        source: merchantRouter
    },
    {
        path: "/bulk-upload",
        source: bulkUploadRouter
    },
];

routes.forEach((route) => {
    router.use(route.path, route.source);
});

export default router;
