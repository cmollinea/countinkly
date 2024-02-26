'use client';
import { signup } from '@/actions';
import logo from '$/public/iPhone-180x180px.png';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignUp } from '@/hooks/use-sign-up';
import Link from 'next/link';
import { SubmitNewUserButton } from '@/components/auth-forms/sign-up-submit';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function SignUp() {
  const { form, handleSignUp, state, isPending } = useSignUp();

  useEffect(() => {
    if (form.formState.isSubmitting) {
      toast(JSON.stringify(form.formState));
    }
  }, [form]);

  useEffect(() => {
    if (!state.error && !state.message) {
      return;
    }

    if (state.message) {
      toast(state.message);
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section className=''>
      <Toaster />
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        <section className='relative flex h-32 items-center place-content-center bg-background lg:col-span-5 lg:h-full xl:col-span-6'>
          <img
            alt=''
            src='https://images.unsplash.com/photo-1611957082126-061f655ef1fb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            className='absolute inset-0 h-full w-full object-cover opacity-20 blur-sm'
          />

          <div className='hidden lg:flex lg:flex-col lg:relative lg:p-12 items-center place-content-center'>
            <Link href={'/'}>
              <Image
                src={logo.src}
                height={logo.height}
                width={logo.width}
                className='h-20 w-20'
                alt='Logo'
              />
            </Link>
            <h2 className='mt-6 font-extrabold max-w-lg text-center md:text-5xl'>
              <span className='bg-gradient-to-r from-primary to-primary bg-[length:100%_5px] bg-bottom bg-no-repeat'>
                Level up
              </span>{' '}
              your tracking game with{' '}
              <span className=' text-primary'>Countinkly</span> now!
            </h2>
          </div>
        </section>

        <main className='flex flex-col px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-background'>
          <div className='max-w-xl lg:max-w-3xl relative'>
            <div className='relative -mt-16 block lg:hidden'>
              <Link
                className='inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20'
                href='/'
              >
                <Image
                  src={logo.src}
                  height={logo.height}
                  width={logo.width}
                  className='h-20 w-20'
                  alt='Logo'
                />
              </Link>

              <h1 className='mt-2 text-2xl font-bold sm:text-3xl md:text-4xl'>
                <span className='bg-gradient-to-r from-primary to-primary bg-[length:100%_5px] bg-bottom bg-no-repeat'>
                  Level up
                </span>{' '}
                your tracking game with{' '}
                <span className=' text-primary'>Countinkly</span> now!
              </h1>
            </div>

            <Form {...form}>
              <form
                // action={signupWithState}
                onSubmit={form.handleSubmit(handleSignUp)}
                className='space-y-2 mt-10 max-w-md mx-auto w-full'
              >
                <FormField
                  control={form.control}
                  name='firstName'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Jhon' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input placeholder='jhondoe@gmail.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder='Repeat Your Password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='occupation'
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Developer, Cm, Content Creator...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isPending || form.formState.isValid}
                  type='submit'
                  size={'lg'}
                  className='w-full mt-6 space-x-2 flex items-center'
                >
                  {isPending && (
                    <span className='h-5 w-5 border-dashed border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin'></span>
                  )}
                  <span>{isPending ? 'Wait a second' : 'Sign Up'}</span>
                </Button>{' '}
              </form>
            </Form>
          </div>
        </main>
      </div>
    </section>
  );
}
