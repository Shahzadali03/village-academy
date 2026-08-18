import { z } from 'zod';
import { objectIdSchema } from './common.js';

export const loginSchema = {
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
  }),
};

export const registerSchema = {
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
};

export const changePasswordSchema = {
  params: z.object({ user_id: objectIdSchema }),
  query: z.object({
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
};
