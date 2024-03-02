import { deleteLink } from '@/actions';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export const useLinkAction = () => {
  const [isNavigating, startNavigation] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  const router = useRouter();

  const handleNavigation = (to: string) => {
    startNavigation(() => router.push(to));
  };

  const handleDeleteLink = async (linkId:string) => {
    const res = await deleteLink(linkId);

    if('message' in res) {
      toast.success(res.message)
    }

    if('error' in res) {
      toast.error(res.error)
    }

    router.refresh()
  }

  return {isNavigating, isDeleting, startDeleting, handleNavigation, handleDeleteLink};
};
