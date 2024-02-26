import { validateRequest } from '@/lib/validateRequest';
import { redirect } from 'next/navigation';
import { Clicks } from '@prisma/client';
import prisma from '@/lib/prisma';

type Props = {
  params: {
    id: string;
  };
};

async function LinksPage({ params }: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/log-in');
  }

  const today = new Date();

  const link = await prisma.link.findFirst({
    where: { id: params.id }
  });

  const clicks = await prisma.clicks.findMany({ where: { linkId: params.id } });

  if (!link) {
    return <p>404</p>;
  }

  console.log(clicks);

  return (
    <section className='grid'>
      <pre className='max-w-xl'>{JSON.stringify(link)}</pre>
      <pre className='max-w-xl'>{JSON.stringify(clicks)}</pre>
    </section>
  );
}

export default LinksPage;
