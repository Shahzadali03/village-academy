import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';
import { publicFormRateLimiter } from '../middleware/security.js';
import {
  createWebAdmissionSchema,
  webAdmissionIdSchema,
} from '../validators/schemas.js';
import * as webAdmissionController from '../controllers/webAdmission.controller.js';

const router = Router();

router.post(
  '/public',
  publicFormRateLimiter,
  validate(createWebAdmissionSchema),
  asyncHandler(webAdmissionController.createPublicApplication)
);

router.get('/', authMiddleware, asyncHandler(webAdmissionController.getApplications));

router.get(
  '/:application_id',
  authMiddleware,
  validate(webAdmissionIdSchema),
  asyncHandler(webAdmissionController.getApplication)
);

router.delete(
  '/:application_id',
  authMiddleware,
  validate(webAdmissionIdSchema),
  asyncHandler(webAdmissionController.deleteApplication)
);

export default router;
