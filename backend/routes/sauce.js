const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);


module.exports = router;