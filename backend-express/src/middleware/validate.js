import { ZodError } from 'zod';
import { BadRequestError } from '../utils/ApiError.js';

function setRequestProperty(req, key, value) {
  Object.defineProperty(req, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

export function validate(schemas) {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body ?? {});
      }
      if (schemas.params) {
        setRequestProperty(req, 'params', schemas.params.parse(req.params));
      }
      if (schemas.query) {
        setRequestProperty(req, 'query', schemas.query.parse(req.query));
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new BadRequestError(error.errors.map((e) => e.message).join(', ')));
      }
      next(error);
    }
  };
}
