const { request, app } = require('./setup');
const router = require('../routes/routes').round;
const { getFakeRound } = require('../helpers/faker');

const mockRound = getFakeRound(1);

jest.mock('../models/queries', () => {
  return {
    ...jest.requireActual('../models/queries'),
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
