
// our piece of middleware will save the image into the images folder

const multer = require('multer'); //import

const MIME_TYPE = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => { // where to store
        callback(null, "images"); // call it and pass 2 arguments (error, file)
    },
    filename: (req, file, callback) => { //file name function
        const name = file.originalname.split(' ').join('_'); // keep the original name without any space error
        const extension = MIME_TYPE[file.mimetype]; // file extension
        callback(null, name + Date.now() + '.' + extension); //say how we name the image. (we add date to avoid doublon)
    }
})


module.exports = multer({storage: storage}).single('image');   //({key: name of the const}) one file



// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + '.' + extension);
//   }
// });

// module.exports = multer({storage: storage}).single('image');