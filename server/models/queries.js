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

// Photo queries

// Round queries

module.exports = { getUser };
