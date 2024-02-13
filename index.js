const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Handle connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle chat message event
    socket.on('message', (msg) => {
        if (msg === 'hi bhai') {
            io.emit('message', 'Hello!');
        } else if (msg === 'bye') {
            io.emit('message', 'Goodbye bhai!');
        }
    });

    // make echo event
    socket.on('echo', (data) => {
        console.log('Data received:', data);
        // Emit data back to the client
        io.emit('echo', data);

    });
});

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