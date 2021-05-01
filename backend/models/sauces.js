const mongoose = require('mongoose'); //set up

	const sauceSchema = mongoose.Schema({ //exemple of a structure object to GET (from API)
    // the id will be autimatically generated
    userId: { type: String, required: true },
    name: { type: String, required: true, maxlength: [50, 'Name can not be more than 50 characters'] },
    manufacturer: { type: String, required: true, maxlength: [50, 'Manufacturer can not be more than 50 characters'] },
    description: { type: String, required: true, maxlength: [500, 'Description can not be more than 500 characters'] },
    mainPepper: { type: String, required: true, maxlength: [50, 'MainPepper can not be more than 50 characters'] },
    imageUrl: { type: String, required: true,  },
    heat: { type: Number, required: true, maxlength: [1, 'Heat can not be more than 1 character'] },
    likes: { type: Number, required: false },
	dislikes: { type: Number, required: false }, // capital to String
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema); //allow to import thing moduel to app and to use it save and find things
// we name the Model with a capital Thing. to differenciate the Model name and the data