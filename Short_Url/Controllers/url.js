const {URL} = require('../Models/url');
const shortid = require('shortid');

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({err : "Url is required"});
    }
    const shortId = shortid();
    await URL.create({
        shortId : shortId,
        redirectUrl:body.url,
        visitedHistory :[],
    });
    return res.json({id:shortId});
}

async function handelGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks : result.visitedHistory.length,
        analytics:result.visitedHistory,
    })
}

module.exports = {handleGenerateNewShortUrl , handelGetAnalytics };