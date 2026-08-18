import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import {
  createInquirySchema,
  updateInquirySchema,
  studentIdSchema,
} from '../validators/schemas.js';
import * as inquiryController from '../controllers/inquiry.controller.js';

const router = Router();

router.get('/', asyncHandler(inquiryController.getInquiries));
router.post('/', validate(createInquirySchema), asyncHandler(inquiryController.createInquiry));
router.put('/:id', validate(updateInquirySchema), asyncHandler(inquiryController.updateInquiry));
router.delete('/:id', validate(studentIdSchema), asyncHandler(inquiryController.deleteInquiry));

export default router;
