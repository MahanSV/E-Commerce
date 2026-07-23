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
        path: "/api/products",
        source: productRouter
    },
    {
        path: "/api/categories",
        source: categoryRouter
    },
    {
        path: "/api/images",
        source: productImagesRouter
    },
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
    {
        path: "/api/bulk-upload",
        source: bulkUploadRouter
    },
];

routes.forEach((route) => {
    router.use(route.path, route.source);
});

export default router;
