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
    createUser: () => {
      return {
        user: mockUser,
      };
    },
  };
});

describe('/GET user route', () => {
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

describe('/POST user route', () => {
  it('returns user id after creating it', () => {
    return request(app)
      .post('/')
      .then((res) => {
        expect(res.body.id).toEqual(mockUser.id);
      });
  });
});
