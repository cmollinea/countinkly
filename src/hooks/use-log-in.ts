import { login } from '@/actions';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useEffect, useTransition } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Required Field' }).max(50),
  password: z.string().min(1, 'Required Field')
});

const initialState = {
  error: ''
};

export const useLogIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  });

  const [isPending, startTransition] = useTransition();
  const [formState, logInWithState] = useFormState(login, initialState);

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

  async function handleLogIn(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    startTransition(async () => {
      await logInWithState(formData);
    });
  }

  return { handleLogIn, form, isPending };
};
