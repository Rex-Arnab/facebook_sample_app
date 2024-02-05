const express = require('express');
const axios = require('axios');
const app = express.Router();

const accessToken = process.env.ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;
const INSTA_ID = process.env.INSTA_ID;

app.get("/insta_account_id", async (_req, res) => {
    const response = await axios.get(`https://graph.facebook.com/v19.0/${PAGE_ID}?fields=instagram_business_account&access_token=${accessToken}`);
    res.json(response.data);
});

// read media
app.get("/read_media", async (_req, res) => {
    const fields = 'id,caption,like_count,media_type,media_url,thumbnail_url,comments';
    const response = await axios.get(`https://graph.facebook.com/v19.0/${INSTA_ID}/media?fields=${fields}&access_token=${accessToken}`);
    res.json(response.data);
});

// insights for Media Object
app.get("/insight/:media_object_id", async (req, res) => {
    const { media_object_id } = req.params;
    const metrics = 'impressions, reach, replies, saved, video_views';
    const response = await axios.get(`https://graph.facebook.com/v18.0/${media_object_id}/insights?metric=${metrics}&access_token=${accessToken}`);
    res.json(response.data);
});

module.exports = app;