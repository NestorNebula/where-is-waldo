const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller').user;

router.get('/:userId', controller.getUser);
router.post('/', controller.postUser);
router.put('/:userId', controller.updateUser);

module.exports = router;
