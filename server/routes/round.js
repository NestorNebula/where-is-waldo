const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller').round;

router.post('/', controller.postRound);
router.put('/', controller.updateRound);

module.exports = router;
