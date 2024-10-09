const { faker } = require('@faker-js/faker');

const getFakeUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    rounds: [],
  };
};

module.exports = { getFakeUser };
