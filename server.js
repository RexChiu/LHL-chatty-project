// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const randomColor = require('randomcolor');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//list of clients
let connectedClients = [];

//list of messages
let messageList = [];

// Possible Colors
let colors = ['silver', 'purple', 'blue', 'navy', 'lime', 'red', 'aqua'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected of: ' + wss.clients.size);

  //sets a random color for the client, and adds to client array
  ws.color = randomColor();
  connectedClients.push(ws);

  //constructs and broadcasts message for the number of online users
  let connectionMessage = {
    type: 'user-change',
    numUsers: wss.clients.size
  };
  broadcastMessage(connectionMessage);

  //constructs sends message for current message list
  let currentMessages = {
    type: 'current-messages',
    messageList: messageList
  };
  ws.send(JSON.stringify(currentMessages));

  //handles on message
  ws.on('message', message => {
    //parse and adds an id to every message
    let parsedMessage = JSON.parse(message);
    parsedMessage.id = uuid();
    console.log('Received: ' + message);

    switch (parsedMessage.type) {
      case 'change-username': //if username change, constructs string to broadcast
        let prevUsername = parsedMessage.prevUsername ? parsedMessage.prevUsername : 'AnonyCats';
        let outgoingMessage = {
          type: 'change-username',
          content: `${prevUsername} has changed their name to ${parsedMessage.username}`,
          id: parsedMessage.id
        };
        broadcastMessage(outgoingMessage);
        break;
      case 'new-message': //if new message, add client's color, and broadcasts
        parsedMessage.color = ws.color;
        broadcastMessage(parsedMessage);
        break;
      default:
        break;
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    removeClient(ws);

    //constructs and broadcasts current number of users
    connectionMessage = {
      type: 'user-change',
      numUsers: wss.clients.size
    };
    broadcastMessage(connectionMessage);
  });
});

//takes a message, stringify and broadcasts to all users
function broadcastMessage(message) {
  messageList.push(message);
  let stringifyMessage = JSON.stringify(message);

  connectedClients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      console.log('sending message');
      client.send(stringifyMessage);
    }
  });
}

//removes a client from the client array
function removeClient(client) {
  for (let i = 0; i < connectedClients.length; i++) {
    if (connectedClients[i] === client) {
      connectedClients.slice(i, 1);
    }
  }
}
