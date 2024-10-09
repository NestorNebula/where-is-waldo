const { request, app } = require('./setup');
const router = require('../routes/routes').user;
const { getFakeUser } = require('../helpers/faker');

app.use('/', router);

const mockUser = getFakeUser();

jest.mock('../models/queries', async () => {
  return {
    ...jest.requireActual('../models/queries'),
    getUser: () => {
      return {
        mockUser,
      };
    },
  };
});

describe('user route', () => {
  it('returns user informations', (done) => {
    request(app)
      .get(`/${mockUser.id}`)
      .then((res) => {
        expect(res, done).toEqual(mockUser);
      });
  });
});
