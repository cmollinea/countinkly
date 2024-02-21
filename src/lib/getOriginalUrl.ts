export async function getOriginalUrl(shortId: string) {
  try {
    const shortUrl = await prisma?.shortedLink.findFirst({
      where: { shortUrl: shortId }
    });

    if (!shortUrl) {
      throw new Error('This is rare, the link wasnt found');
    }

    const originalLink = await prisma?.link.findFirst({
      where: { id: shortUrl.linkId }
    });
    if (originalLink) {
      return originalLink;
    }
    throw new Error("Original link wasn't found");
  } catch (err) {
    if (err instanceof Error) {
      return err.cause + ' | ' + err.message;
    }
    return JSON.stringify(err);
  }
}
