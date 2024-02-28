import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { signup } from '@/actions';
import { useFormState } from 'react-dom';
import { useEffect, useTransition } from 'react';

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

  const [formState, signupWithState] = useFormState(signup, initialState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
		if (!formState.error && !formState.message) {
			return;
		}

		if (formState.message) {
			toast(formState.message);
		}

		if (formState.error) {
			toast.error(formState.error);
		}
	}, [formState]);

  async function handleSignUp(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    // Object.entries(values).forEach((property) =>
    //   formData.append(property[0], property[1])
    // );
    for (const [key, value] of Object.entries(values))  {
      formData.append(key, value)
    } 
    Object.entries(values)
    startTransition(async () => {
      await signupWithState(formData);
    });
  }

  return { form, handleSignUp, isPending };
}
