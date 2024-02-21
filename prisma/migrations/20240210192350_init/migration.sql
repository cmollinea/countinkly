-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortedLink" (
    "shortUrl" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,

    CONSTRAINT "ShortedLink_pkey" PRIMARY KEY ("shortUrl")
);

-- CreateTable
CREATE TABLE "LinkMetadata" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "og" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,

    CONSTRAINT "LinkMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clicks" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,

    CONSTRAINT "Clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "ShortedLink_shortUrl_key" ON "ShortedLink"("shortUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortedLink_linkId_key" ON "ShortedLink"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkMetadata_linkId_key" ON "LinkMetadata"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "Clicks_linkId_key" ON "Clicks"("linkId");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortedLink" ADD CONSTRAINT "ShortedLink_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkMetadata" ADD CONSTRAINT "LinkMetadata_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clicks" ADD CONSTRAINT "Clicks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
