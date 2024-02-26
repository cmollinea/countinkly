'use client';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import logo from '$/public/iPhone-180x180px.png';
import { Toaster, toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/actions';

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 character' })
    .max(50),
  password: z.string().min(6).max(50)
});

export default function LogIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    await login(formData);
    toast(<p>{JSON.stringify(values)}</p>);
  }

  return (
    <div className='min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6'>
      <Toaster />
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          className='mx-auto h-10 w-auto'
          src={logo.src}
          alt='Countinkly Logo'
          height={logo.height}
          width={logo.width}
        />
        <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm leading-5 max-w'>
          <Link
            href='/sign-up'
            className='font-medium text-primary hover:underline transition ease-in-out duration-150'
          >
            Or create a new acccount
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md border border-foreground/10'>
        <div className='py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                defaultValue=''
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Your Username' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                defaultValue=''
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='Your Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isLoading}
                type='submit'
                size={'lg'}
                className='w-full'
              >
                {form.formState.isLoading ? 'Wait' : 'Log In'}
              </Button>
            </form>
          </Form>
          <div className='flex flex-col w-full mt-4 items-center place-content-center'>
            <Button variant={'outline'} size={'lg'} className='w-full'>
              <Github />
              Use Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
