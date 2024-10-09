-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(20) NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "avatar" VARCHAR(20) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharactersOnPhotos" (
    "photoId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "CharactersOnPhotos_pkey" PRIMARY KEY ("photoId","characterId")
);

-- CreateTable
CREATE TABLE "Round" (
    "userId" TEXT NOT NULL,
    "photoId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "score" BIGINT,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("userId","photoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Photo_title_key" ON "Photo"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_avatar_key" ON "Character"("avatar");

-- AddForeignKey
ALTER TABLE "CharactersOnPhotos" ADD CONSTRAINT "CharactersOnPhotos_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnPhotos" ADD CONSTRAINT "CharactersOnPhotos_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
