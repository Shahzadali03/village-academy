import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import {
  createStudentSchema,
  updateStudentSchema,
  studentIdSchema,
} from '../validators/schemas.js';
import * as studentController from '../controllers/student.controller.js';

const router = Router();

router.get('/', asyncHandler(studentController.getStudents));
router.post('/', validate(createStudentSchema), asyncHandler(studentController.createStudent));
router.get('/:id', validate(studentIdSchema), asyncHandler(studentController.getStudent));
router.put('/:id', validate(updateStudentSchema), asyncHandler(studentController.updateStudent));
router.delete('/:id', validate(studentIdSchema), asyncHandler(studentController.deleteStudent));

export default router;
