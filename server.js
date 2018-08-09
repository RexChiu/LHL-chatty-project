// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected of: ' + wss.clients.size);
  connectionMessage = {
    type: 'user-change',
    numUsers: wss.clients.size
  };
  broadcastMessage(connectionMessage);

  ws.on('message', message => {
    let parsedMessage = JSON.parse(message);
    parsedMessage.id = uuid();
    console.log('Received: ' + message);

    switch (parsedMessage.type) {
      case 'change-username':
        let prevUsername = parsedMessage.prevUsername ? parsedMessage.prevUsername : 'AnonyCats';
        let outgoingMessage = {
          type: 'change-username',
          content: `${prevUsername} has changed their name to ${parsedMessage.username}`,
          id: parsedMessage.id
        };
        broadcastMessage(outgoingMessage);
        break;
      case 'new-message':
        broadcastMessage(parsedMessage);
        break;
      default:
        break;
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log('Client connected of: ' + wss.clients.size);
    connectionMessage = {
      type: 'user-change',
      numUsers: wss.clients.size
    };
    broadcastMessage(connectionMessage);
  });
});

function broadcastMessage(message) {
  let stringifyMessage = JSON.stringify(message);

  wss.clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      console.log('sending message');
      client.send(stringifyMessage);
    }
  });
}
