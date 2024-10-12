import { getFakeLevel, getFakeUser } from '../../src/helpers/faker';

const mockContext = () => {
  return {
    user: getFakeUser(),
    levels: [getFakeLevel(), getFakeLevel(), getFakeLevel()],
    API_URL: null,
  };
};

export { mockContext };
