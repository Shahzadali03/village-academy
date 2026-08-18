import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError } from '../utils/ApiError.js';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Invalid token'));
  }

  const token = header.slice(7);

  try {
    req.user = jwt.verify(token, env.secretKey, { algorithms: [env.jwtAlgorithm] });
    next();
  } catch {
    next(new UnauthorizedError('Invalid token'));
  }
}

export function requireSelfOrAdmin(paramKey = 'user_id') {
  return (req, res, next) => {
    const requestedId = req.params[paramKey];

    if (String(req.user.user_id) !== String(requestedId)) {
      return next(new UnauthorizedError('You can only modify your own account'));
    }

    next();
  };
}
