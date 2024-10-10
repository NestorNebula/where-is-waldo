const prisma = require('../models/queries');

const getPhotos = async (req, res) => {
  const photos = await prisma.getAllPhotos();
  if (!photos) return res.sendStatus(500);
  res.json({ photos });
};

const getPhotoRounds = () => {};

const postPhoto = () => {};

const updatePhoto = () => {};

module.exports = { getPhotos, getPhotoRounds, postPhoto, updatePhoto };
