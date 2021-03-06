
const Sauce = require('../models/sauces');
const fs = require ('fs');

// @desc      Create Sauce
// @route     POST /api/sauces
// @access    User
exports.createSauce = (req, res, next) => { // create a thing in the database. any file that import ouf stuff controller, will be able to acess it
  //because of image, the request will be in different format on request
  const url = req.protocol + '://' + req.get('host');
  req.body.sauce = JSON.parse(req.body.sauce); // req.body.sauce is a string and the form is an object, so we'll turn it into a json object
	const sauce = new Sauce({ //create a new Thing, a new mdel
	  //no need a id, because generated by mongo
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
  });
  console.log('sauce' + sauce); 
	sauce.save().then( //allow to save thing to the data base .then: it return a promess
	  () => {
		res.status(201).json({ //sent response to the front-end with a status
		  message: 'Post saved successfully!' //and a message
		});
    }
  ).catch( // catch any error
	  (error) => {
      console.log(error);
    res.status(400).json({ //standard error status
      
		  error: error // object with the error that is throwing
		});
	  }
	);
  };


// @desc      Get one Sauce
// @route     POST /api/sauces/:id
// @access    User
exports.getOneSauce = (req, res, next) => { //: tells that this parameter will be dynamic
Sauce.findOne({ //request the model Thing
    _id: req.params.id//id because the id of the end point of the API
}).then( //return a promess
    (sauce) => { // witht hte data called thing
    res.status(200).json(sauce);
    },
    console.log('single page sauce')
).catch( // set up the error block
    (error) => {
    res.status(404).json({
        error: error
    });
    }
);
};

// @desc      Like
// @route     POST /api/sauces/:id/like
// @access    User
exports.addLike = (req, res, next) => {
  console.log("Post Like/dislike");
  let sauce = new Sauce({ _id: req.params._id });
  console.log("sauce:", sauce);
  console.log('req.body', req.body)
  if(req.body.like == 1) {
    sauce = {
      _id: req.params.id, 
      likes: 1,
      $addToSet: { // add only if value does not exist. (contrairly to push)
        usersLiked: req.body.userId
      }
    };
      console.log("Post Like -- if");
      console.log("sauce:", sauce);
      console.log('req.body', req.body)
  } else if (req.body.like == 0) {
    sauce = {
      _id: req.params.id, 
      likes: 0,
      dislikes: 0,
      $pull: { // add only if value does not exist. (contrairly to push)
        usersLiked: req.body.userId,
        usersDisliked: req.body.userId,
      }
    };
    console.log("Post == 0 -- else if")
  } else {
    sauce = { 
      _id: req.params.id, 
      dislikes: 1,
      $addToSet: { // add only if value does not exist. (contrairly to push)
        usersDisliked: req.body.userId
      }
  }
  console.log("Post dislike -- else");
  console.log("sauce:", sauce);
  console.log('req.body', req.body);
  
}
  console.log("result");
  console.log('likes', sauce.likes);
  console.log('dislike', sauce.dislikes);


  Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
      res.status(201).json({
          message: 'Sauce update successfully'
      });
      }

  ).catch(
      (error) => {
      res.status(400).json({
          error: error
      });
      }
  );
};



// @desc      Get all Sauces
// @route     GET /api/sauces
// @access    User
exports.getAllSauces = (req, res, next) => { //add api end point
  
Sauce.find().then( //use the Thing model and use the find method. It returns promess
    (sauces) => { //then we receive our data
    res.status(200).json(sauces); // send back status of 200 and a json containing our things
    }  
    ).catch( //if error
    (error) => {
        res.status(400).json({ // sent status 
        error: error // and the error
        });
    }
    ); // get the model and return a promess
};


// @desc      Modify Sauce
// @route     PUT /api/sauces/:id
// @access    User owner
exports.modifySauce = (req, res, next) => {
  console.log('controller put');
  let sauce = new Sauce({ _id: req.params._id });

  if(req.file) { // if we receive an image
    const url = req.protocol + '://' + req.get('host');
    console.log('url', url)
    req.body.sauce = JSON.parse(req.body.sauce); // req.body.sauce is a string and the form is an object, so we'll turn it into a json object
    sauce = { 
        _id: req.params.id, // because it is a new thing, it will have a new ID. we then tell to keep the old id, which is in the parameters
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
    };
    // console.log(sauce)
    console.log("put: if part")
    console.log("sauce", sauce);
    console.log('req.body', req.body)
    console.log('req.file', req.file)

  } else { // just update de json data (without new image file)
    sauce = { // create the new data that will replace the precedent one
      _id: req.params.id, // because it is a new thing, it will have a new ID. we then tell to keep the old id, which is in the parameters
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat,
    };
      console.log("put: else part");
      console.log("sauce:", sauce);
      console.log('req.body', req.body)
      console.log('req.file', req.file)
  }
  Sauce.updateOne({_id: req.params.id}, sauce).then( // update an existing thing. as argument {the thing we want to update (id will be the same as in the parameter)}, the new thing that will replce the old one
      () => {
      res.status(201).json({
          message: 'Sauce update successfully'
      });
      }

  ).catch(
      (error) => {
      res.status(400).json({
          error: error
      });
      }
  );
};

// @desc      Delete Sauce
// @route     DELETE /api/sauces/:id
// @access    User owner
exports.deleteSauce = (req, res, next) => { //when click on delete
  Sauce.findOne({_id: req.params.id}).then( // get access to the sauce in the database
    (sauce) => { filename = sauce.imageUrl.split('/images/')[1]; //we receive promess //all our url contain images/ (first part protocol and host name and second our file name
      fs.unlink('images/' + filename, () => {  //delete the file with fs package we use unlink function (argument: path to the file to delete, callback )
        Sauce.deleteOne({ _id: req.params.id}).then( //we delete in the database
        () => {
        res.status(200).json({ 
            message: 'Deleted'
        });
        }
    ).catch(
        (error) => {
        res.status(400).json({
            error: error
        });
        }
    );
    })
    }
  );

};
