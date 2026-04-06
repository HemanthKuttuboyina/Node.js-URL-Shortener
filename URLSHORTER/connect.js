const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
async function connectToMongoDB(url) {
    return mongoose.connect(url, { serverSelectionTimeoutMS: 2000 }).then(()=>console.log("Connected to MONGODB"));
}

module.exports = connectToMongoDB;