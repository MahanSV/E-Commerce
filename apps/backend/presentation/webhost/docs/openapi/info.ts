const openApiInfo = {
  title: 'E-Commerce API',
  version: '1.0.0',
  description: 'HTTP API for the E-Commerce application.',
};

const openApiServers = [{ url: '/api', description: 'Current API server' }];

const openApiTags = [{ name: 'Slugs', description: 'Product lookup by slug' }];

export { openApiInfo, openApiServers, openApiTags };
