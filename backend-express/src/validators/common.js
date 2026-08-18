import mongoose from 'mongoose';
import { z } from 'zod';

export const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), 'Invalid ID format');

export const genderSchema = z.enum(['Male', 'Female', 'Other']);

export const studentBodySchema = z.object({
  name: z.string().trim().min(1).max(255),
  father_name: z.string().trim().min(1).max(255),
  age: z.coerce.number().int().min(5).max(100).optional(),
  gender: genderSchema.optional(),
  class_id: objectIdSchema,
  phone_number: z.string().trim().min(1).max(11),
  address: z.string().trim().max(255).optional(),
});

export const idParamSchema = z.object({
  id: objectIdSchema,
});

export const monthYearQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000).max(2100),
});
