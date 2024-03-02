import { object, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ActionResult } from '@/actions';
import { useFormState } from 'react-dom';
import { useCallback, useEffect, useTransition } from 'react';

const initialState = {
  message: '',
  error: '',
  linkPayload: null
};

type ZodSchema = z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;

type Action = (prevState: any, formData: FormData) => Promise<ActionResult>;

export function useFormWithAction(action: Action, zodShema: ZodSchema) {
  const form = useForm<z.infer<typeof zodShema>>({
    resolver: zodResolver(zodShema)
  });

  const [formState, signupWithState] = useFormState(action, initialState);
  const [isPending, startTransition] = useTransition();

  const resetForm = useCallback(() => form.reset(), [form]);

  useEffect(() => {
    console.log(resetForm);
  }, [resetForm]);

  useEffect(() => {
    if (!formState.error && !formState.message) {
      return;
    }

    if (formState.linkPayload) {
      console.log(formState.linkPayload);
    }

    if (formState.message) {
      toast.success(formState.message);
      resetForm();
    }

    if (formState.error) {
      toast.error(formState.error);
    }
  }, [formState.error, formState.message, formState.linkPayload, resetForm]);

  async function handleAction(values: z.infer<typeof zodShema>) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    startTransition(async () => {
      await signupWithState(formData);
    });
  }

  return { form, handleAction, formState, isPending };
}
