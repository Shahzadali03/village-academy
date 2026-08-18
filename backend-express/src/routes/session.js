import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import {
  createSessionSchema,
  updateSessionSchema,
  studentIdSchema,
} from '../validators/schemas.js';
import * as classController from '../controllers/class.controller.js';

const router = Router();

router.get('/', asyncHandler(classController.getSessions));
router.post('/', validate(createSessionSchema), asyncHandler(classController.createSession));
router.put('/:id', validate(updateSessionSchema), asyncHandler(classController.updateSession));
router.delete('/:id', validate(studentIdSchema), asyncHandler(classController.deleteSession));

export default router;
