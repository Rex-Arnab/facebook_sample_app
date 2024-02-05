const express = require('express');
const axios = require('axios');
const app = express.Router();

const accessToken = process.env.ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

app.get('/me', async (_req, res) => {
    const fields = 'id,name';
    const response = await axios.get(`https://graph.facebook.com/me?fields=${fields}&access_token=${accessToken}`);
    res.json(response.data);
});

app.get("/page_info", async (_req, res) => {
    const fields = 'name,description,followers_count,fan_count,unread_message_count,unseen_message_count';
    const response = await axios.get(`https://graph.facebook.com/v19.0/${PAGE_ID}?fields=${fields}&access_token=${accessToken}`);
    res.json(response.data);
});

app.get("/ad_posts", async (_req, res) => {
    const fields = 'id,created_time,from';
    const response = await axios.get(`https://graph.facebook.com/v19.0/${PAGE_ID}/ads_posts?fields=${fields}&access_token=${accessToken}`);
    res.json(response.data);
});

app.get("/get_inbox_list", async (_req, res) => {
    const fields = 'conversations';
    const response = await axios.get(`https://graph.facebook.com/v19.0/me?fields=${fields}&access_token=${accessToken}`);
    res.json(response.data);
});

app.get("/read_message", async (_req, res) => {
    const fields = 'conversations{message_count,unread_count,messages,participants}';
    const response = await axios.get(`https://graph.facebook.com/v19.0/me?fields=${fields}&access_token=${accessToken}`);
    res.json(response.data);
});

app.post("/read_message/:conversationId", async (req, res) => {
    const { conversationId } = req.params;
    const fields = 'id,message,created_time';
    const response = await axios.get(`https://graph.facebook.com/v19.0/${conversationId}/messages?fields=${fields}&access_token=${accessToken}`);
    res.json(response.data);
});

module.exports = app;