const { request, app } = require('./setup');
const router = require('../routes/routes').round;
const { getFakeUser, getFakePhoto, getFakeRound } = require('../helpers/faker');

const mockUser = getFakeUser();
const mockPhoto = getFakePhoto();
const mockRound = getFakeRound(mockPhoto.id);

jest.mock('../models/queries', () => {
  return {
    ...jest.requireActual('../models/queries'),
    getUser: () => {
      return mockUser;
    },
    getPhoto: () => {
      return mockPhoto;
    },
    createRound: () => {
      return mockRound;
    },
  };
});

app.use('/', router);

describe('/POST round route', () => {
  it('returns 201 status after creating round', (done) => {
    request(app)
      .post('/')
      .send({ userId: mockRound.userId, photoId: mockRound.photoId })
      .expect(201, done);
  });
});
