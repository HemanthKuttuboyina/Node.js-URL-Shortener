const shortid = require('shortid'); // Correct import statement
const URL = require('../models/url');

const handleGenerateShortURL = async (req, res) => {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url required" });
    }

    const nanoID = shortid.generate(); // Correct way to generate a short ID
    await URL.create({
        shortID: nanoID,
        redirectURL: body.url,
        visitHistory: [], // Fixed typo: 'visitdHistory' to 'visitHistory'
    });

    return res.json({ id: nanoID });
};

module.exports = handleGenerateShortURL;
