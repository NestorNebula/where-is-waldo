const prisma = require('../models/queries');

const getPhotos = async (req, res) => {
  const photos = await prisma.getAllPhotos();
  if (!photos) return res.sendStatus(500);
  res.json({ photos });
};

const getPhotoRounds = async (req, res) => {
  const photo = await prisma.getPhoto(+req.params.photoId);
  if (!photo) return res.sendStatus(400);
  const rounds = await prisma.getPhotoBestRounds(
    photo.id,
    req.query.limit && req.query.limit <= 100 ? req.query.limit : 100
  );
  rounds ? res.json({ rounds }) : res.json({ rounds: [] });
};

const postPhoto = async (req, res) => {
  await prisma.createPhoto(req.body.title);
  res.sendStatus(201);
};

const updatePhoto = async (req, res) => {
  const photo = await prisma.getPhoto(+req.params.photoId);
  if (!photo) return res.sendStatus(400);
  const updatedPhoto = await prisma.updatePhoto(photo.id, req.body.title);
  res.json({ photo: updatedPhoto });
};

module.exports = { getPhotos, getPhotoRounds, postPhoto, updatePhoto };
