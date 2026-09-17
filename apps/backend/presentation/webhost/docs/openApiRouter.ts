import { Router, RequestHandler } from 'express';
import { registry } from '#webhost/docs/openapiRegistry.ts';

type RouteConfig = Omit<Parameters<typeof registry.registerPath>[0], 'method' | 'path'>;

// تابعی برای تبدیل پارامترهای اکسپرس به فرمت OpenAPI (مثلاً :id به {id})
const toOpenApiPath = (p: string) => p.replace(/:(\w+)/g, '{$1}');

export function createApiRouter(expressRouter: Router, basePath: string = '') {
    return {
        get: (path: string, config: RouteConfig, ...handlers: RequestHandler[]) => {
            expressRouter.get(path, ...handlers);
            // ترکیب مسیر پایه با مسیر فعلی و حذف اسلش‌های اضافه
            const fullPath = `${basePath}${path}`.replace(/\/+/g, '/');
            // تبدیل :id به {id} برای OpenAPI
            registry.registerPath({ method: 'get', path: toOpenApiPath(fullPath), ...config });
        },
        post: (path: string, config: RouteConfig, ...handlers: RequestHandler[]) => {
            expressRouter.post(path, ...handlers);
            const fullPath = `${basePath}${path}`.replace(/\/+/g, '/');
            registry.registerPath({ method: 'post', path: toOpenApiPath(fullPath), ...config });
        },
        put: (path: string, config: RouteConfig, ...handlers: RequestHandler[]) => {
            expressRouter.put(path, ...handlers);
            const fullPath = `${basePath}${path}`.replace(/\/+/g, '/');
            registry.registerPath({ method: 'put', path: toOpenApiPath(fullPath), ...config });
        },
        delete: (path: string, config: RouteConfig, ...handlers: RequestHandler[]) => {
            expressRouter.delete(path, ...handlers);
            const fullPath = `${basePath}${path}`.replace(/\/+/g, '/');
            registry.registerPath({ method: 'delete', path: toOpenApiPath(fullPath), ...config });
        },
        use: expressRouter.use.bind(expressRouter),
    };
}