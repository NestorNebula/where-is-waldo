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
    coordinates: JSON.stringify(getFakeCoordinates()),
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

const getFakeAnonymousUser = () => {
  return {
    id: faker.string.uuid(),
    username: null,
    rounds: [],
  };
};

const getFakeRound = (userId = 1, photoId = 1) => {
  return {
    userId,
    photoId,
    startTime: new Date(Date.now()),
    endTime: null,
    score: null,
    user: getFakeUser(),
  };
};

const getFakeOverRound = (userId = 1, photoId = 1) => {
  const startTime = faker.date.recent();
  const endTime = new Date(Date.now());
  return {
    userId,
    photoId,
    startTime,
    endTime,
    score: endTime - startTime,
    user: getFakeUser(),
  };
};

const getFakeCoordinates = () => {
  const minX = faker.number.int({ max: 99 });
  const minY = faker.number.int({ max: 99 });
  return {
    minX,
    maxX: minX + 1,
    minY,
    maxY: minY + 1,
  };
};

export {
  getFakeLevel,
  getFakeCharacterOnLevel,
  getFakeCharacter,
  getFakeUser,
  getFakeAnonymousUser,
  getFakeRound,
  getFakeOverRound,
  getFakeCoordinates,
};
