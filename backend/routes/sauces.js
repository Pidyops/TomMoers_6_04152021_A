const express = require('express');
const router = express.Router(); //create Router

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.get('/', auth, saucesCtrl.getAllSauces );
router.post('/', auth, multer, saucesCtrl.createSauce );
router.get('/:id', auth, saucesCtrl.getOneSauce );
//modify
//delete
router.put('/:id', auth, saucesCtrl.modifySauce );
router.delete('/:id', auth, saucesCtrl.deleteSauce );

module.exports = router; //exporter it and make it available to the app