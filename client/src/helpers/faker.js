import { faker } from '@faker-js/faker';

const getFakeLevel = () => {
  const levelId = faker.number.int({ max: 10 });
  return {
    id: levelId,
    title: faker.image.urlPlaceholder(),
    characters: [
      getFakeCharacterOnLevel(levelId),
      getFakeCharacterOnLevel(levelId),
      getFakeCharacterOnLevel(levelId),
      getFakeCharacterOnLevel(levelId),
      getFakeCharacterOnLevel(levelId),
    ],
  };
};

const getFakeCharacterOnLevel = (levelId) => {
  const characterId = faker.number.int({ max: 100 });
  return {
    characterId,
    coordinates: {},
    photoId: levelId,
    character: getFakeCharacter(characterId),
  };
};

const getFakeCharacter = (id) => {
  const name = faker.person.firstName();
  return {
    id,
    name,
    avatar: faker.image.urlPlaceholder({ text: name }),
  };
};

const getFakeUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    rounds: [],
  };
};

export { getFakeLevel, getFakeCharacterOnLevel, getFakeCharacter, getFakeUser };
