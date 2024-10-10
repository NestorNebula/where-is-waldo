const prisma = require('../models/queries');

const postRound = async (req, res) => {
  const user = await prisma.getUser(+req.body.userId);
  const photo = await prisma.getPhoto(+req.body.photo);
  if (!user || !photo) return res.sendStatus(400);
  await prisma.createRound(user.id, photo.id);
  res.sendStatus(201);
};

const updateRound = () => {};

module.exports = { postRound, updateRound };
