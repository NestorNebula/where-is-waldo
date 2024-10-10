const { faker } = require('@faker-js/faker');

const getFakeUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    rounds: [],
  };
};

const getFakePhoto = () => {
  return {
    id: faker.number.int({ max: 100 }),
    title: faker.string.alpha(10),
    characters: [],
    rounds: [],
  };
};

module.exports = { getFakeUser, getFakePhoto };
