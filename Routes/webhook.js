const express = require('express');
const app = express.Router();

const accessToken = process.env.WEBHOOK_VERIFY_TOKEN;

app.get('/', (req, res) => {
    console.log(req.query);
    const VERIFY_TOKEN = accessToken;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.post('/', (req, res) => {
    let body = req.body;

    console.log(req.query);
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });
    return res.status(200).json({
        message: 'POST request received'
    });
});


module.exports = app;