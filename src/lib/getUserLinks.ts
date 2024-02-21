import prisma from './prisma';

export const getUserLinks = async (userId: string) => {
  const links = await prisma.link.findMany({
    where: { userId },
    include: { shortedLink: true, linkMetadata: true }
  });
  return links;
};
