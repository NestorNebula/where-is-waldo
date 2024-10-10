const { PrismaClient } = require('@prisma/client');
const { photo } = require('../controllers/controller');

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

const getPhoto = async (id) => {
  const photo = await prisma.photo.findUnique({
    where: { id },
  });
  return photo;
};

const getAllPhotos = async () => {
  const photos = await prisma.photo.findMany();
  return photos;
};

const createPhoto = async (title) => {
  await prisma.photo.create({
    data: {
      title,
    },
  });
};

const updatePhoto = async (id, title) => {
  const photo = await prisma.photo.update({
    where: { id },
    data: {
      title,
    },
  });
  return photo;
};

// Round queries

const getRound = async (userId, photoId) => {
  const round = await prisma.round.findUnique({
    where: {
      userId_photoId: {
        userId,
        photoId,
      },
    },
  });
  return round;
};

const getPhotoBestRounds = async (photoId, limit = 100) => {
  const rounds = await prisma.round.findMany({
    where: { photoId },
    orderBy: { score: { sort: 'asc', nulls: 'last' } },
    take: limit,
  });
  return rounds;
};

const createRound = async (userId, photoId) => {
  await prisma.round.create({
    data: {
      userId,
      photoId,
    },
  });
};

const updateOngoingRound = async (userId, photoId, round) => {
  const updatedRound = await prisma.round.update({
    where: {
      userId_photoId: {
        userId,
        photoId,
      },
    },
    data: {
      endTime: round.endTime,
      score: round.score,
    },
  });
  return updatedRound;
};

const updateRound = async (userId, photoId) => {
  const round = await prisma.round.update({
    where: {
      userId_photoId: {
        userId,
        photoId,
      },
    },
    data: {
      startTime: new Date(Date.now()),
      endTime: null,
      score: null,
    },
  });
  return round;
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  getPhoto,
  getAllPhotos,
  createPhoto,
  updatePhoto,
  getRound,
  getPhotoBestRounds,
  createRound,
  updateOngoingRound,
  updateRound,
};
