import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Required Field' }).max(50),
  password: z.string().min(1, 'Required Field')
});

export const signUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    occupation: z.string(),
    email: z
      .string()
      .email({ message: 'Enter a valid email' })
      .endsWith('gmail.com'),
    username: z
      .string()
      .min(5, { message: 'Username must be at least 5 character' })
      .max(50)
      .trim(),
    password: z
      .string()
      .min(6)
      .max(50)
      .regex(/(?=.*?[#?!@$%^&*-])/, {
        message: 'Password must includes a special character (#?!@$%^&*-)'
      }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

export const linkSchema = z.object({
  displayName: z.string().min(1, { message: 'Required Field' }),
  url: z.string().url().min(1, { message: 'Required Field' }),
  title: z.string().optional(),
  description: z.string().optional(),
  og: z.string().url().optional()
});

export const commentSchema = z.object({
  content: z.string().min(1, {message:'Required'})
})
