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


// const connectDB = async () => {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });

//     console.log(`MongoDB Connecter: ${conn.connection.host}`.cyan.bold);
// }

// mongoose.connect('mongodb+srv://Tom:R8Bs17QGWr2JHpMD@cluster0.f9gcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// .then(() => {
// console.log("successfully connected to MOngoDb Atlas");
// })
// .catch((error) => {
// console.log('unable to connect to MongoDB Atlas');
// console.error(error);
// })