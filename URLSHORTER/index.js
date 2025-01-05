const express = require("express")
const app = express();
const url = require("./models/url")
const urlRouter = require('./routes/url')
const connectToMongoDB = require('./connect')

app.use(express.json());

app.use('/url',urlRouter)

app.get('/:shortID',async(req,res)=>{
    const shortid = req.params.shortID;

    const entry = await url.findOneAndUpdate(
        {
            shortid,
        },
        {
            $push:{
                visitHistory:{timestamp:Date.now()},                
            },
        }

    );
    res.redirect(entry.redirectURL);
})

connectToMongoDB('mongodb://127.0.0.1:27017/URLShorter')


const PORT = 8001;
app.listen(PORT,()=>{console.log(`Server is Live in ${PORT}`)})