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

const postPhoto = () => {};

const updatePhoto = () => {};

module.exports = { getPhotos, getPhotoRounds, postPhoto, updatePhoto };
