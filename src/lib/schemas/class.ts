import * as z from 'zod';

export const createClassSchema = z.object({
  className: z
    .string()
    .min(3, 'Class name must be at least 3 characters')
    .max(50, 'Class name must be less than 50 characters'),
  ageRange: z.string({
    required_error: 'Please select an age range',
  }),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(100, 'Subject must be less than 100 characters'),
  duration: z.string({
    required_error: 'Please select a session duration',
  }),
  problems: z
    .object({
      discipline: z.number().min(0).max(10),
      motivation: z.number().min(0).max(10),
      attendance: z.number().min(0).max(10),
      space: z.number().min(0).max(10),
      cultural: z.number().min(0).max(10),
    })
    .refine((data) => {
      const total = Object.values(data).reduce((a, b) => a + b, 0);
      return total > 0;
    }, 'Please rate at least one common problem'),
  equipment: z
    .object({
      phones: z.boolean(),
      tablets: z.boolean(),
      internet: z.boolean(),
      projector: z.boolean(),
      board: z.boolean(),
      tv: z.boolean(),
    })
    .refine((data) => {
      return Object.values(data).some((value) => value);
    }, 'Please select at least one equipment option'),
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
