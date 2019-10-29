const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const serverSocket = require('./server_socket.js')

// Get our API routes
const api = require('./api')

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set api routes
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/test', (req, res) => {
    serverSocket.print("new");
    res.send('Sent msg to socket')
})

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/parallelServer/index.html'));
});


/*
 * Get port from env and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
    serverSocket.openSocketConnection()
})
