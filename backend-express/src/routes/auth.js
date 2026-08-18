import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware, requireSelfOrAdmin } from '../middleware/auth.js';
import { authRateLimiter } from '../middleware/security.js';
import { loginSchema, registerSchema, changePasswordSchema } from '../validators/auth.validator.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authRateLimiter, validate(registerSchema), asyncHandler(authController.register));

router.post('/login', authRateLimiter, validate(loginSchema), asyncHandler(authController.login));

router.put(
  '/users/:user_id/change-password',
  authMiddleware,
  requireSelfOrAdmin('user_id'),
  validate(changePasswordSchema),
  asyncHandler(authController.changePassword)
);

export default router;
