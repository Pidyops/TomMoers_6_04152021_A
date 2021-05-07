const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
    console.log("successfully connected to MOngoDb Atlas");
    })
    .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas');
    console.error(error);
    })
} 

module.exports = connectDB;
