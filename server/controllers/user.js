const prisma = require('../models/queries');

const getUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await prisma.getUser(userId);
  if (!user) return res.sendStatus(404);
  res.json(user);
};

const postUser = async (req, res) => {
  const user = await prisma.createUser();
  if (!user) return res.sendStatus(500);
  res.status(201).json({ id: user.id });
};

const updateUser = async (req, res) => {
  const user = await prisma.updateUser(req.params.userId, req.body.username);
  if (!user) return res.sendStatus(400);
  res.json(user);
};

module.exports = { getUser, postUser, updateUser };
