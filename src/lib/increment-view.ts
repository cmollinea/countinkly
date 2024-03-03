export async function incrementView(linkId: string) {
  const data = await prisma?.link.update({
    where: { id: linkId },
    data: {
      clickCount: { increment: 1 }
    }
  });
}
