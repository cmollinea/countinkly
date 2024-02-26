'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export const HomeNav = () => {
  return (
    <div className='flex items-center place-content-center space-x-4 font-semibold max-md:hidden'>
      <Link href={'/'}> Home</Link>
      <Link href={'/log-in'}>Log In</Link>
      <Link
        className={buttonVariants({
          variant: 'default',
          className: 'font-semibold'
        })}
        href={'/sign-up'}
      >
        Sign Up
      </Link>
    </div>
  );
};
