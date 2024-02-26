'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export function SubmitNewUserButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type='submit'
      size={'lg'}
      className='w-full mt-6 space-x-2 flex items-center'
    >
      {pending && (
        <span className='h-5 w-5 border-dashed border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin'></span>
      )}
      <span>{pending ? 'Wait a second' : 'Sign Up'}</span>
    </Button>
  );
}
