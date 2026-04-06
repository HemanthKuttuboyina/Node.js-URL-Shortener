require('dotenv').config();
const express = require("express")
const app = express();
const url = require("./models/url")
const urlRouter = require('./routes/url')
const connectToMongoDB = require('./connect')
const { MongoMemoryServer } = require('mongodb-memory-server');

app.use(express.static('public'));
app.use(express.json());

app.use('/url',urlRouter)

app.get('/:shortID',async(req,res)=>{
    const shortid = req.params.shortID;

    const entry = await url.findOneAndUpdate(
        { shortID: shortid },
        {
            $push:{
                visitHistory:{timestamp:Date.now()},                
            },
        }

    );
    if (!entry) return res.status(404).json({ error: "URL not found" });
    res.redirect(entry.redirectURL);
})

const startServer = async () => {
    try {
        await connectToMongoDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/URLShorter');
    } catch (err) {
        console.error("Failed to connect to local MongoDB. Starting in-memory fallback database...");
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await connectToMongoDB(mongoUri);
        console.log("Successfully connected to In-Memory MongoDB.");
    }

    const PORT = process.env.PORT || 8001;
    app.listen(PORT,()=>{console.log(`Server is Live in ${PORT}`)})
};

startServer();