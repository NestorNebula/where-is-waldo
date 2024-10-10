const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// User queries

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { rounds: true },
  });
  return user;
};

const createUser = async () => {
  const user = await prisma.user.create({});
  return user;
};

const updateUser = async (id, username) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      username,
    },
  });
  return user;
};

// Photo queries

const getAllPhotos = async () => {
  const photos = await prisma.photo.findMany();
  return photos;
};

// Round queries

const getPhotoBestRounds = async (photoId, limit = 100) => {
  const rounds = await prisma.round.findMany({
    where: { photoId },
    orderBy: { score: { sort: 'asc', nulls: 'last' } },
    take: limit,
  });
  return rounds;
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  getAllPhotos,
  getPhotoBestRounds,
};
