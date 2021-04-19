const mongoose = require('mongoose'); //set up

	const sauceSchema = mongoose.Schema({ //exemple of a structure object to GET (from API)
    // the id will be autimatically generated
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
	dislikes: { type: Number, required: false }, // capital to String
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema); //allow to import thing moduel to app and to use it save and find things
// we name the Model with a capital Thing. to differenciate the Model name and the data