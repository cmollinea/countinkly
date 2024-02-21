import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid'>
        <Link href={'/log-in'}>Log In</Link>
        <Link href={'/sign-up'}>Sign Up</Link>
        <Link href={'/dashboard'}> Dashboard</Link>
      </div>
    </main>
  );
}
