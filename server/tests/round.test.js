const { request, app } = require('./setup');
const router = require('../routes/routes').round;
const {
  getFakeUser,
  getFakePhoto,
  getFakeRound,
  getFakeOngoingRound,
} = require('../helpers/faker');

const mockUser = getFakeUser();
const mockPhoto = getFakePhoto();
const mockRound = getFakeRound(mockPhoto.id);
const mockOngoingRound = getFakeOngoingRound(mockPhoto.id);

jest.mock('../models/queries', () => {
  return {
    ...jest.requireActual('../models/queries'),
    getUser: () => {
      return mockUser;
    },
    getPhoto: () => {
      return mockPhoto;
    },
    getRound: (userId, photoId) => {
      const rounds = [mockRound, mockOngoingRound];
      const round = rounds.find(
        (round) => round.userId === userId && round.photoId === photoId
      );
      return round ? round : null;
    },
    createRound: () => {
      return mockRound;
    },
    updateOngoingRound: (userId, photoId, round) => {
      mockOngoingRound.endTime = round.endTime;
      mockOngoingRound.score = round.score;
      return mockOngoingRound;
    },
    updateRound: (userId, photoId) => {
      mockRound.endTime = null;
      mockRound.score = null;
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

describe('/PUT round route', () => {
  it("'restarts' Round when already over", () => {
    return request(app)
      .put(`/${mockRound.id}`)
      .send({ userId: mockRound.userId, photoId: mockRound.photoId })
      .type('body')
      .then((res) => {
        const { round } = res.body;
        expect(round.score).toBeNull();
      });
  });

  it('set result when Round is over', () => {
    return request(app)
      .put(`/${mockOngoingRound.id}`)
      .send({
        userId: mockOngoingRound.userId,
        photoId: mockOngoingRound.photoId,
      })
      .then((res) => {
        const { round } = res.body;
        expect(round.score).not.toBeNull();
        expect(round.endTime).not.toBeNull();
      });
  });
});
