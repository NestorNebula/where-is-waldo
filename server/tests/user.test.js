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
      const users = [mockUser];
      const user = users.find((user) => user.id === userId);
      if (user) {
        return {
          user,
        };
      } else {
        return null;
      }
    },
    createUser: () => {
      return {
        id: mockUser.id,
      };
    },
    updateUser: (userId, username) => {
      const users = [mockUser];
      const user = users.find((user) => user.id === userId);
      if (user) {
        user.username = username;
        return { user };
      } else {
        return null;
      }
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
      .expect(201)
      .then((res) => {
        expect(res.body.id).toEqual(mockUser.id);
      });
  });
});

describe('/PUT user route', () => {
  it('updates existing user', () => {
    return request(app)
      .put(`/${mockUser.id}`)
      .type('form')
      .send({ username: fakeUser.username })
      .expect(200)
      .then((res) => {
        const { user } = res.body;
        expect(user.id).toBe(mockUser.id);
        expect(user.username).toBe(fakeUser.username);
      });
  });

  it("returns 400 when user doesn't exist", (done) => {
    request(app)
      .put(`/${fakeUser.id}`)
      .send({ username: mockUser.username })
      .type('form')
      .expect(400, done());
  });
});
