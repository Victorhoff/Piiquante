const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.findSauce);
router.get('/:id', auth, sauceCtrl.findOneSauce);

module.exports = router;