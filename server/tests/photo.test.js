const { request, app } = require('./setup');
const router = require('../routes/routes').photo;
const { getFakePhoto } = require('../helpers/faker');

app.use('/', router);

const mockPhoto = getFakePhoto;
const mockedPhoto = getFakePhoto();

jest.mock('../models/queries', () => {
  return {
    ...jest.requireActual('../models/queries'),
    getPhoto: (id) => {
      if (id === mockedPhoto.id) {
        return true;
      }
      return false;
    },
    getAllPhotos: () => {
      return [mockPhoto(), mockPhoto(), mockPhoto()];
    },
    getPhotoBestRounds: () => {
      return mockedPhoto.rounds.sort((a, b) => {
        a.score - b.score;
      });
    },
  };
});

describe('/GET photo route', () => {
  it('returns all photos', () => {
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.body.photos.length).toBe(3);
      });
  });

  it("returns photo's best scores", () => {
    return request(app)
      .get(`/${mockedPhoto.id}/rounds`)
      .then((res) => {
        const rounds = res.body.rounds;
        expect(rounds[0].score).toBeLessThanOrEqual(rounds[1].score);
        expect(rounds[1].score).toBeLessThanOrEqual(rounds[2].score);
      });
  });

  it('returns the queried number of best scores', () => {
    return request(app)
      .get(`/${mockedPhoto.id}/rounds`)
      .query({ limit: 2 })
      .then((res) => {
        const rounds = res.body.rounds;
        expect(rounds.length).toBe(2);
      });
  });

  it("returns 400 when photoId isn't correct", (done) => {
    request(app).get(`/${getFakePhoto().id}/rounds`).expect(400, done);
  });
});
