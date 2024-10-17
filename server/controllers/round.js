const prisma = require('../models/queries');

const postRound = async (req, res) => {
  const user = await prisma.getUser(req.body.userId);
  const photo = await prisma.getPhoto(+req.body.photoId);
  if (!user || !photo) return res.sendStatus(400);
  await prisma.createRound(user.id, photo.id);
  res.sendStatus(201);
};

const updateRound = async (req, res) => {
  const userId = req.body.userId;
  const photoId = +req.body.photoId;
  const round = await prisma.getRound(userId, photoId);
  if (!round) return res.sendStatus(400);
  if (round.score) {
    const updatedRound = await prisma.updateRound(userId, photoId);
    return res.json({ round: updatedRound });
  }
  const endTime =
    req.body.endTime instanceof Date ? req.body.endTime : new Date(Date.now());
  const score = endTime - round.startTime;
  const updatedRound = await prisma.updateOngoingRound(userId, photoId, {
    endTime,
    score,
  });
  res.json({ round: updatedRound });
};

module.exports = { postRound, updateRound };
