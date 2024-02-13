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

app.get('/', (_req, res) => {
    const APP_ID = process.env.ACCESS_TOKEN;
    const redirect_url = process.env.HOST_URL + '/fbcallback';
    const CONFIG_ID = process.env.CONFIG_ID;

    res.json({
        message: 'Please Login thought this url to initate facebook login for business account',
        url: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${redirect_url}&state=testing&response_type=code&config_id=${CONFIG_ID}`
    });
});

app.get('/fbcallback', (req, res) => {
    return res.json(req.query);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});