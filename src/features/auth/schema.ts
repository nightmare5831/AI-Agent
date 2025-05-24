import { z } from 'zod';
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email cannot be empty' })
    .email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(1, { message: 'Password cannot be empty' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const profileInputSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z
    .string()
    .min(1, { message: 'Full name cannot be empty' })
    .min(4, { message: 'Full name must be at least 4 characters' }),
  email: z
    .string()
    .min(1, { message: 'Email cannot be empty' })
    .email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(1, { message: 'Password cannot be empty' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.string().optional(),
  subscription_plan: z
    .string()
    .min(1, {message: 'Subscription not be null'}),
  stripeSubscriptionId: z
    .string(),
  credits_balance: z
    .number()
    .min(0, {message: 'Credit Balance cannot be negative'})
});

export type ProfileInput = z.infer<typeof profileInputSchema>;

export const changePasswordSchema = z
  .object({
    password: z.string().min(6),
    new_password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'new_password and confirm_password must match',
    path: ['confirm_password'],
  });
