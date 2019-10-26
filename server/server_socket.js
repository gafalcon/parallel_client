const net = require('net');
let socketCon;

module.exports.openSocketConnection = () => {
    const server = net.createServer((socket) => {
        socketCon = socket;
        socket.write('Echo server\r\n');
        socket.on('data', (data) => {
            // console.log(data);
            textChunk = data.toString('utf-8');
            console.log(textChunk);
            socket.write(textChunk);
        });

        socket.on('close', () => {
            console.log('Connection closed');
        })

        socket.on('error', (err) => {
            console.error(JSON.stringify(err))
        })
    })

    console.log("Server socket on port 1337");
    server.listen(1337, '127.0.0.1');
}

module.exports.print = (data) => {
    socketCon.write(data + "\r\n");
}
