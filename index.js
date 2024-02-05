const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Import Routes
const facebookRoutes = require('./Routes/facebook');
const instagramRoutes = require('./Routes/instagram');
const webhookRoutes = require('./Routes/webhook');
app.use('/fb', facebookRoutes);
app.use('/insta', instagramRoutes);
app.use('/webhook', webhookRoutes);



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


// app.get('/', (_req, res) => {
//     res.json({
//         message: 'Hello, World!'
//     });
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});