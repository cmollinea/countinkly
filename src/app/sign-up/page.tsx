/* eslint-disable @next/next/no-img-element */
import logo from '$/public/iPhone-180x180px.png';
import { SignUpForm } from '@/components/auth-forms/sign-up-form';
import { signUpBgImage } from '@/constants/images';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
  return (
    <section className=''>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        <section className='relative flex h-32 items-center place-content-center bg-background lg:col-span-5 lg:h-full xl:col-span-6'>
          <img
            alt='Background'
            src={signUpBgImage}
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
                className='inline-flex size-16 items-center justify-center rounded-full sm:size-20'
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

            <SignUpForm />
          </div>
        </main>
      </div>
    </section>
  );
}
