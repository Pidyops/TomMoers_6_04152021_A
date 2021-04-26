const express = require('express');
const router = express.Router(); //create Router

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const validator = require('../middleware/validator')

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces );
router.post('/', auth, multer, saucesCtrl.createSauce );
// router.post('/', auth, multer, saucesCtrl.validate('createSauce'), saucesCtrl.createSauce );
// router.post('/', auth, multer, saucesCtrl.createSauce );
router.post('/', auth, multer, saucesCtrl.createSauce );

router.get('/:id', auth, saucesCtrl.getOneSauce );
router.post('/:id/like', saucesCtrl.addLike ); // ???
router.put('/:id', auth, multer, saucesCtrl.modifySauce );
router.delete('/:id', auth, saucesCtrl.deleteSauce );

module.exports = router; //exporter it and make it available to the app