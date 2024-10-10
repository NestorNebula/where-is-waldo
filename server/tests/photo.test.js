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
        return mockedPhoto;
      }
      return false;
    },
    getAllPhotos: () => {
      return [mockPhoto(), mockPhoto(), mockPhoto()];
    },
    getPhotoBestRounds: (id, limit = 100) => {
      mockedPhoto.rounds.sort((a, b) => {
        return a.score - b.score;
      });
      const results = [];
      for (let i = 0; i < limit; i++) {
        results.push(mockedPhoto.rounds[i]);
      }
      return results;
    },
    createPhoto: () => {
      return;
    },
    updatePhoto: (id, title) => {
      mockedPhoto.title = title;
      return mockedPhoto;
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

describe('/POST photo route', () => {
  it('returns 201 after posting photo', (done) => {
    request(app)
      .post('/')
      .send({ title: 'title' })
      .type('form')
      .expect(201, done);
  });
});

describe('/PUT photo route', () => {
  it('update photos and returns it', () => {
    return request(app)
      .put(`/${mockedPhoto.id}`)
      .send({ title: 'title' })
      .type('form')
      .expect(200)
      .then((res) => {
        const { photo } = res.body;
        expect(photo.title).toBe('title');
      });
  });
});
