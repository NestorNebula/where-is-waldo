const { request, app } = require('./setup');
const router = require('../routes/routes').photo;
const { getFakePhoto } = require('../helpers/faker');

app.use('/', router);

const mockPhoto = getFakePhoto;

jest.mock('../models/queries', () => {
  return {
    getAllPhotos: () => {
      return [mockPhoto(), mockPhoto(), mockPhoto()];
    },
    ...jest.requireActual('../models/queries'),
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
