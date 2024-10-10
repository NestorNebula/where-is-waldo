const { request, app } = require('./setup');
const router = require('../routes/routes').user;
const { getFakeUser } = require('../helpers/faker');

app.use('/', router);

const mockUser = getFakeUser();
const fakeUser = getFakeUser();

jest.mock('../models/queries', () => {
  return {
    ...jest.requireActual('../models/queries'),
    getUser: (userId) => {
      if (userId === mockUser.id) {
        return {
          user: mockUser,
        };
      } else {
        return null;
      }
    },
  };
});

describe('user route', () => {
  it('returns user informations', () => {
    return request(app)
      .get(`/${mockUser.id}`)
      .then((res) => {
        expect(res.body.user).toEqual(mockUser);
      });
  });

  it("returns 404 when user doesn't exist", (done) => {
    request(app).get(`/${fakeUser.id}`).expect(404, done);
  });
});
