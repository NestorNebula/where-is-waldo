const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller').photo;

router.get('/', controller.getPhotos);
router.get('/:photoId/rounds', controller.getPhotoRounds);
router.post('/', controller.postPhoto);
router.put('/:photoId', controller.updatePhoto);

module.exports = router;
