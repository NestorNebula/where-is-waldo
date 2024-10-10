const { request, app } = require('./setup');
const router = require('../routes/routes').photo;
const { getFakePhoto } = require('../helpers/faker');

app.use('/', router);

const mockPhoto = getFakePhoto;

jest.mock('../models/queries', () => {
  return {
    ...jest.requireActual('../models/queries'),
    getAllPhotos: () => {
      return [mockPhoto(), mockPhoto(), mockPhoto()];
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
});
