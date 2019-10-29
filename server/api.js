const express = require('express');
const router = express.Router();
const socket = require('./server_socket.js');

/* GET api listing */
router.get('/', (req, res) => {
    res.send('api works');
})

router.get('/nodes', (req, res) => {
    const nodes = [
        {url: 'localhost', status: 1}
    ]
    res.send(nodes);
})

router.post('/task', (req, res) => {
    console.log("/task");
    res.send({});
    socket.print("pi 100");
});
module.exports = router;
