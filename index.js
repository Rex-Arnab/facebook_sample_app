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
const { default: axios } = require("axios");
app.use('/fb', facebookRoutes);
app.use('/insta', instagramRoutes);
app.use('/webhook', webhookRoutes);

const APP_ID = process.env.ACCESS_TOKEN;
const APP_SECRET = process.env.ACCESS_SECRET;
const redirect_url = process.env.HOST_URL;
const CONFIG_ID = process.env.CONFIG_ID;

app.get('/login', (_req, res) => {

    res.json({
        message: 'Please Login thought this url to initate facebook login for business account',
        url: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${redirect_url}&state=testing&response_type=code&config_id=${CONFIG_ID}`
    });
});


app.get('/', async (req, res) => {
    const { code } = req.query;

    if (code) {
        try {
            const resp = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${redirect_url}&client_secret=${APP_SECRET}&code=${code}`)
            const accessToken = resp.data.access_token;
            return res.json(accessToken);
        } catch (error) {
            console.log('Redirect URI: ', redirect_url);
            console.log(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&redirect_uri=${redirect_url}&code=${code}`)
            console.log("ERROR: ", error.response.data);
        }
        return res.json(req.query);
    } else {
        res.json({
            message: 'Hello, Social!'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});