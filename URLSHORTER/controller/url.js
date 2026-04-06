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

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortID: shortId });
    if (!result) return res.status(404).json({ error: "URL not found" });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
};

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
};
