import express from 'express';
import userRouter from '#routes/user.ts'


const router = express.Router();

const routes = [
	{
		path: '/users',
		source: userRouter,
	},
];

routes.forEach((route) => {
	router.use(route.path, route.source);
});

export default router;
