import {
  getFakeLevel,
  getFakeUser,
  getFakeAnonymousUser,
} from '../../src/helpers/faker';

const mockContext = (anonymous) => {
  return {
    user: anonymous ? getFakeAnonymousUser() : getFakeUser(),
    levels: [getFakeLevel(), getFakeLevel(), getFakeLevel()],
    API_URL: null,
  };
};

export { mockContext };
