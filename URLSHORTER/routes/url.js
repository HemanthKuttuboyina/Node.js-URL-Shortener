const express = require("express");
const shorturl = require('../controller/url')
const router = express.Router();

router.post('/',shorturl);
module.exports = router;