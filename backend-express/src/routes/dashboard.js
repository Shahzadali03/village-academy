import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as dashboardController from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/', asyncHandler(dashboardController.getDashboardStats));

export default router;
