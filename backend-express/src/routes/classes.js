import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import {
  createClassSchema,
  updateClassSchema,
  studentIdSchema,
} from '../validators/schemas.js';
import * as classController from '../controllers/class.controller.js';

const router = Router();

router.get('/', asyncHandler(classController.getClasses));
router.post('/', validate(createClassSchema), asyncHandler(classController.createClass));
router.put('/:id', validate(updateClassSchema), asyncHandler(classController.updateClass));
router.delete('/:id', validate(studentIdSchema), asyncHandler(classController.deleteClass));

export default router;
