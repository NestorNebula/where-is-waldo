const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller').round;

router.post('/', controller.postRound);
router.put('/:roundId', controller.updateRound);

module.exports = router;
