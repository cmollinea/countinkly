export async function getClicks(linkId: string) {
  const clicks = await prisma?.clicks.findMany({ where: { linkId: linkId } });

  return clicks;
}
