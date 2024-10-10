const { faker } = require('@faker-js/faker');

const getFakeUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    rounds: [],
  };
};

const getFakePhoto = () => {
  const id = faker.number.int({ max: 100 });
  return {
    id,
    title: faker.string.alpha(10),
    characters: [],
    rounds: [getFakeRound(id), getFakeRound(id), getFakeRound(id)],
  };
};

const getFakeRound = (photoId) => {
  return {
    userId: faker.string.uuid(),
    photoId,
    startTime: faker.date.recent(),
    endTime: new Date(Date.now()),
    score: faker.number.bigInt(),
  };
};

module.exports = { getFakeUser, getFakePhoto, getFakeRound };
