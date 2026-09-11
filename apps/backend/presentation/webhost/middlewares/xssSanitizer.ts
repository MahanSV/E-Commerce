import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import validator from 'validator';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitizeValue(value: any): any {
  if (typeof value === 'string') {
    return validator.escape(value);
  } else if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  } else if (typeof value === 'object' && value !== null) {
    return sanitizeObject(value);
  }
  return value;
}

function sanitizeObject(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  const cleanObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      if (key === 'message' || key === 'stack') {
        cleanObj[key] = obj[key];
      } else {
        cleanObj[key] = sanitizeValue(obj[key]);
      }
    }
  }
  return cleanObj;
}

function replaceProperties(target: any, source: any): void {
  Object.keys(target).forEach(key => delete target[key]);
  Object.keys(source).forEach(key => target[key] = source[key]);
}

export default function xssSanitizer(req: any, res: any, next: any) {
  try {
    if (req.body && typeof req.body === 'object') {
      const sanitizedBody = sanitizeObject(req.body);
      replaceProperties(req.body, sanitizedBody);
    }

    if (req.params && typeof req.params === 'object') {
      const sanitizedParams = sanitizeObject(req.params);
      replaceProperties(req.params, sanitizedParams);
    }

    if (req.query && typeof req.query === 'object') {
      req.queryPolluted = sanitizeObject(req.query);
    }

    if (req.queryPolluted && typeof req.queryPolluted === 'object') {
      const sanitizedPolluted = sanitizeObject(req.queryPolluted);
      replaceProperties(req.queryPolluted, sanitizedPolluted);
    }

    next();
  } catch (err) {
    next(err);
  }
}