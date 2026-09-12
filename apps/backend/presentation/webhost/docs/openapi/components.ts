const openApiComponents = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'JWT access token. The API also accepts the AccessToken cookie.',
    },
    apiToken: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-TOKEN',
      description: 'Required for non-browser clients by the application security middleware.',
    },
  },
  schemas: {
    ProductImage: {
      type: 'object',
      required: ['imageID', 'image'],
      properties: {
        imageID: { type: 'string', example: 'image_01' },
        image: { type: 'string', example: 'https://cdn.example.com/products/image.jpg' },
      },
    },
    Product: {
      type: 'object',
      required: ['id', 'categoryId', 'title', 'slug', 'mainImage', 'manufacturer', 'inStock', 'price', 'rating', 'quantity'],
      properties: {
        id: { type: 'string', example: '5b41c011-7781-4ca0-99fe-37e9bc872724' },
        categoryId: { type: 'string', example: '4c2cc9ec-7504-4b7c-8ecd-2379a854a423' },
        title: { type: 'string', example: 'Wireless headphones' },
        slug: { type: 'string', example: 'wireless-headphones-demo' },
        mainImage: { type: 'string', example: 'product9.webp' },
        manufacturer: { type: 'string', example: 'Sony' },
        inStock: { type: 'integer', example: 1 },
        price: { type: 'integer', example: 89 },
        rating: { type: 'integer', example: 3 },
        quantity: { type: 'integer', example: 0 },
        SKU: { type: 'string', nullable: true, example: 'WH-1000' },
        socialLink: { type: 'string', nullable: true, example: 'https://example.com/product' },
        description: { type: 'string', nullable: true, example: 'This is wireless headphones description' },
        information: { type: 'string', nullable: true },
        photo: { type: 'array', items: { $ref: '#/components/schemas/ProductImage' } },
        wishlists: { type: 'array', items: { type: 'object' } },
        merchantProducts: { type: 'array', items: { type: 'object' } },
        category: { type: 'object' },
        orderItems: { type: 'array', items: { type: 'object' } },
        bulkUploadItems: { type: 'array', items: { type: 'object' } },
      },
    },
    Error: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Product not found' },
        code: { type: 'integer', example: 404 },
      },
    },
  },
};

export default openApiComponents;
