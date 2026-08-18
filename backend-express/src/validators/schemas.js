import { z } from 'zod';
import { objectIdSchema, idParamSchema, studentBodySchema } from './common.js';

export const createStudentSchema = { body: studentBodySchema };
export const updateStudentSchema = { params: idParamSchema, body: studentBodySchema };
export const studentIdSchema = { params: idParamSchema };

export const createAdmissionSchema = {
  body: z.object({
    admission_date: z.coerce.date(),
    previous_school: z.string().trim().max(255).optional().nullable(),
    guardian_name: z.string().trim().min(1).max(255),
    guardian_number: z.string().trim().min(1).max(20),
    student: studentBodySchema,
  }),
};

export const updateAdmissionSchema = {
  params: idParamSchema,
  body: z.object({
    admission_date: z.coerce.date(),
    previous_school: z.string().trim().max(255).optional().nullable(),
    guardian_name: z.string().trim().min(1).max(255),
    guardian_number: z.string().trim().min(1).max(20),
    student: studentBodySchema,
  }),
};

export const createInquirySchema = {
  body: z.object({
    name: z.string().trim().min(1).max(255),
    father_name: z.string().trim().min(1).max(255),
    age: z.coerce.number().int().positive().optional(),
    gender: z.string().trim().optional(),
    class_id: objectIdSchema,
    phone_number: z.string().trim().min(1).max(11),
    address: z.string().trim().max(255).optional(),
    source: z.string().trim().min(1).max(255),
    previous_school: z.string().trim().max(255).optional().nullable(),
  }),
};

export const updateInquirySchema = {
  params: idParamSchema,
  body: z.object({
    name: z.string().trim().min(1).max(255),
    father_name: z.string().trim().min(1).max(255),
    age: z.coerce.number().int().positive().optional(),
    gender: z.string().trim().optional(),
    class_id: objectIdSchema,
    phone_number: z.string().trim().min(1).max(11),
    address: z.string().trim().max(255).optional(),
    previous_school: z.string().trim().max(255).optional().nullable(),
  }),
};

export const createClassSchema = {
  body: z.object({
    name: z.string().trim().min(1).max(255),
    session_id: objectIdSchema,
  }),
};

export const updateClassSchema = {
  params: idParamSchema,
  body: z.object({
    name: z.string().trim().min(1).max(255),
  }),
};

export const createSessionSchema = {
  body: z.object({
    session: z.string().trim().min(1).max(255),
  }),
};

export const updateSessionSchema = {
  params: idParamSchema,
  body: z.object({
    session: z.string().trim().min(1).max(255),
  }),
};

export const updateFeeSchema = {
  params: idParamSchema,
  body: z
    .object({
      amount: z.coerce.number().int().nonnegative().optional(),
      isPaid: z.boolean().optional(),
    })
    .optional()
    .default({}),
};

export const webAdmissionIdSchema = {
  params: z.object({ application_id: objectIdSchema }),
};

export const createWebAdmissionSchema = {
  body: z
    .object({
      student_name: z.string().trim().min(2).max(255),
      father_name: z.string().trim().min(2).max(255),
      phone: z.string().trim().min(7).max(20),
      email: z.string().email().optional().nullable(),
      address: z.string().trim().max(255).optional().nullable(),
      admission_category: z.enum(['tuition', 'professional']),
      class_applying: z.string().trim().max(255).optional().nullable(),
      course_name: z.string().trim().max(255).optional().nullable(),
      preferred_batch: z.string().trim().max(100).optional().nullable(),
      previous_school: z.string().trim().max(255).optional().nullable(),
      message: z.string().trim().max(2000).optional().nullable(),
    })
    .superRefine((data, ctx) => {
      if (data.admission_category === 'tuition' && !data.class_applying) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Class applying is required for tuition admissions',
          path: ['class_applying'],
        });
      }

      if (data.admission_category === 'professional') {
        if (!data.course_name) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Course name is required for professional admissions',
            path: ['course_name'],
          });
        }
        if (!data.preferred_batch) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Preferred batch is required for professional admissions',
            path: ['preferred_batch'],
          });
        }
      }
    }),
};
