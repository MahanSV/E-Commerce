import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJSDoc from 'swagger-jsdoc';
import openApiComponents from '#webhost/docs/openapi/components.ts';
import { openApiInfo, openApiServers, openApiTags } from '#webhost/docs/openapi/info.ts';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const routeDocumentationGlob = path
  .resolve(currentDirectory, '../routes/**/*.ts')
  .replaceAll(path.sep, '/');

/**
 * Builds the OpenAPI document from shared metadata and route-local @openapi
 * blocks. Endpoint documentation stays next to the route it describes.
 */
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: openApiInfo,
    servers: openApiServers,
    tags: openApiTags,
    components: openApiComponents,
  },
  apis: [routeDocumentationGlob],
});

export default swaggerSpec;
