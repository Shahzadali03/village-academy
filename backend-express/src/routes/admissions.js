import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import {
  createAdmissionSchema,
  updateAdmissionSchema,
  studentIdSchema,
} from '../validators/schemas.js';
import * as admissionController from '../controllers/admission.controller.js';

const router = Router();

router.get('/', asyncHandler(admissionController.getAdmissions));
router.post('/', validate(createAdmissionSchema), asyncHandler(admissionController.createAdmission));
router.put('/:id', validate(updateAdmissionSchema), asyncHandler(admissionController.updateAdmission));
router.delete('/:id', validate(studentIdSchema), asyncHandler(admissionController.deleteAdmission));

export default router;
