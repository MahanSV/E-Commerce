import {exceptionHandler} from '#middlewares/exceptionHandler.ts';

export default {
  postActionMiddlewares: [
    exceptionHandler,
  ],
  preActionMiddlewares: [

  ],
};
