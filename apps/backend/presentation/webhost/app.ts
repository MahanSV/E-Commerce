import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import hpp from 'hpp';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import { authLimiter } from '#middlewares/authenticityMiddlewares/rateLimiter.ts';
import { exceptionConverter, exceptionHandler } from '#middlewares/exceptionHandler.ts';
import ApiError from '#webhost/errors/apiError.ts';
import env from '#substructure/env.ts';
import routes from '#routes/index.ts';
import qs from 'qs';
import xssSanitizer from '#middlewares/xssSanitizer.ts';
import normalizeMiddleware from '#middlewares/normalizeMiddleware.ts';

const app = express();

// Set Content-Type and override res.json for bigint and status
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  const originalJson = res.json.bind(res);

  res.json = (data) => {
    const replacer = (key, value) => (typeof value === 'bigint' ? value.toString() : value);

    const stringified = JSON.stringify(data, replacer);

    res.send(stringified);
  };

  next();
});


// Header Security
app.use(helmet());

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitizing Input
app.use(xssSanitizer);

// Compressing Responses
app.use(compression());

// Whitelist for CORS
const whitelist = [
  env.corsLocalFrontend,
  env.corsDevFrontend,
  env.corsDevInternal,
];

const corsOptions = {
  origin: (origin: any, callback: any): void => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization', 'X-API-TOKEN', 'X-Requested-With'],
};

// Handel preflight
app.use(cors(corsOptions));

// Middleware to check apiToken for tools
app.use((req, res, next) => {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const apiToken = req.headers['x-api-token'];
  const browserSignatures = ['mozilla', 'chrome', 'safari', 'firefox', 'edge'];
  const isBrowser = browserSignatures.some(sig => userAgent.includes(sig));
  const isTool = !isBrowser;

  if (isTool) {
    if (!apiToken || apiToken !== env.toolAccessToken) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
  }
  next();
});

// Protection against HPP (HTTP Parameter Pollution)
app.use(hpp());

// Limit repeated failed login requests in production environment
if (env.environment === 'production') {
  app.use('/v1/users/login', authLimiter);
}

// Set custom query parser
// app.set('query parser', str => qs.parse(str));

// Customize Express's query string parser to support deep parsing of nested objects and arrays.
// Uses the 'qs' library to parse query strings with dot notation keys (e.g., searchInfo[0].fieldName).
// - allowDots: enables parsing keys with dots into nested objects,
// - depth: sets maximum nesting depth to 10 levels.
// This ensures req.query contains properly structured objects/arrays for complex query parameters.
app.set('query parser', (str: any) => {
  return qs.parse(str, {
    allowDots: true,
    depth: 10,
  });
});

// Parse cookies
app.use(cookieParser());

// Apply normalization middleware to all incoming requests
app.use(normalizeMiddleware);

// API routes
app.use('/v1', routes);

// Handle 404
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError
app.use(exceptionConverter);

// Error handler
app.use(exceptionHandler);

export default app;
