import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { signup } from '@/actions';
import { useFormState } from 'react-dom';
import { useTransition } from 'react';

const formSchema = z
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
      .max(50),
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

const initialState = {
  message: '',
  error: ''
};

export function useSignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  });

  const [state, signupWithState] = useFormState(signup, initialState);
  const [isPending, startTransition] = useTransition();

  async function handleSignUp(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach((property) =>
      formData.append(property[0], property[1])
    );
    startTransition(() => {
      signupWithState(formData);
    });
    toast(JSON.stringify(values));
  }

  return { form, handleSignUp, state, isPending };
}
