import { createRecord } from '@/lib/createRecord';
import { getOriginalUrl } from '@/lib/getOriginalUrl';
import { incrementView } from '@/lib/incrementView';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

type Props = {
  params: {
    id: string;
  };
};

async function VisitCounter({ params }: Props) {
  const link = await getOriginalUrl(params.id);
  if (typeof link === 'string') {
    return <p>{link}</p>;
  }

  createRecord(link.id);
  incrementView(link.id);
  redirect(link.url);
  return null;
}
export default VisitCounter;
