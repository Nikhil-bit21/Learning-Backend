const express = require('express');
const {handleGenerateNewShortUrl , handelGetAnalytics} = require('../Controllers/url');
const router = express.Router();

router.post('/',handleGenerateNewShortUrl);

router.get('/analytics/:shortId',handelGetAnalytics)

module.exports = router;