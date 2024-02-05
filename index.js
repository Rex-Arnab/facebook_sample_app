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
    res.json({
        message: 'Hello, User!'
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});