import Image from 'next/image';
import logo from '$/public/iPhone-180x180px.png';

export const Footer = () => {
  return (
    <footer className=' border-t border-foreground/20 bg-background rounded-t-xl'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='flex justify-center sm:justify-start items-center gap-1'>
            <Image
              src={logo.src}
              height={logo.height}
              width={logo.width}
              alt='Logo'
              className='w-10 h-10'
            />
            <span className='font-bold text-xl'>Countinkly</span>
          </div>

          <p className='mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right'>
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
