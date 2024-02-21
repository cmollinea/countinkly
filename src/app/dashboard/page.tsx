import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/validateRequest';
import { addNewLink } from '@/actions';
import Link from 'next/link';

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/log-in');
  }

  const handleAddNewLink = addNewLink.bind(null, user.id);

  console.log(user);

  return (
    <section className='grid gap-4'>
      <h1>
        Hi, {user.username}! here are your{' '}
        <Link href={'/dashboard/links'}>Links</Link>
      </h1>
      <div className='grid gap-2'>
        <form action={handleAddNewLink}>
          <div>
            <label htmlFor='url'>Url</label>
            <input id='url' type='text' name='url' />
          </div>
          <div>
            <label htmlFor='title'>Title Metadata</label>
            <input id='title' type='text' name='title' />
          </div>
          <div>
            <label htmlFor='description'> Description Metadata</label>
            <input id='description' type='text' name='description' />
          </div>
          <div>
            <label htmlFor='og'>Og Metadata</label>
            <input id='og' type='text' name='og' />
          </div>
          <button type='submit'>submit</button>
        </form>
      </div>
    </section>
  );
}
