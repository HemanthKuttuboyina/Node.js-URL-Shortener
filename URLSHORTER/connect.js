const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
async function connectToMongoDB(url) {
    return mongoose.connect(url).then(()=>console.log("Connected to MONGODB"));
}

module.exports = connectToMongoDB;