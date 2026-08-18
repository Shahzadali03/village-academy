import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import pinoHttp from 'pino-http';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { authMiddleware } from './middleware/auth.js';
import { globalRateLimiter } from './middleware/security.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import admissionRoutes from './routes/admissions.js';
import inquiryRoutes from './routes/inquiries.js';
import feeRoutes from './routes/fees.js';
import classRoutes from './routes/classes.js';
import sessionRoutes from './routes/session.js';
import dashboardRoutes from './routes/dashboard.js';
import webAdmissionRoutes from './routes/webAdmissions.js';

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(pinoHttp({ logger }));
  app.use(helmet());
  app.use(compression());
  app.use(cors({
    origin: env.corsOrigins,
    credentials: true,
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(globalRateLimiter);

  app.get('/health', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

    res.status(dbState === 1 ? 200 : 503).json({
      status: dbState === 1 ? 'ok' : 'degraded',
      uptime: process.uptime(),
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/', (req, res) => {
    res.json({ message: 'Village Academy API is running' });
  });

  app.use(authRoutes);
  app.use('/students', authMiddleware, studentRoutes);
  app.use('/admissions', authMiddleware, admissionRoutes);
  app.use('/inquiries', authMiddleware, inquiryRoutes);
  app.use('/fees', authMiddleware, feeRoutes);
  app.use('/classes', authMiddleware, classRoutes);
  app.use('/session', authMiddleware, sessionRoutes);
  app.use('/dashboard-stats', authMiddleware, dashboardRoutes);
  app.use('/web-admissions', webAdmissionRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
