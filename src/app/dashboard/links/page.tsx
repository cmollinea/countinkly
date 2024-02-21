import { getUserLinks } from '@/lib/getUserLinks';
import { validateRequest } from '@/lib/validateRequest';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function LinksPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/?code=401');
  }
  const links = await getUserLinks(user?.id);
  return (
    <section>
      <div className='grid gap-2'>
        {links.map((link) => (
          <Link key={link.id} href={`/${link.shortedLink?.shortUrl as string}`}>
            {link.linkMetadata?.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
export default LinksPage;
