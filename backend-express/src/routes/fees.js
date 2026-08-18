import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { monthYearQuerySchema } from '../validators/common.js';
import { updateFeeSchema } from '../validators/schemas.js';
import * as feeController from '../controllers/fee.controller.js';

const router = Router();

router.get('/monthly', validate({ query: monthYearQuerySchema }), asyncHandler(feeController.getMonthlyFees));
router.get('/current', asyncHandler(feeController.getCurrentFees));
router.get('/collection/months', asyncHandler(feeController.getCollectionMonths));
router.get('/collection', validate({ query: monthYearQuerySchema }), asyncHandler(feeController.getCollection));
router.patch('/:id', validate(updateFeeSchema), asyncHandler(feeController.updateFee));

export default router;
