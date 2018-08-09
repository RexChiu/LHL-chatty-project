import React, { Component, Fragment } from 'react';

import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: null }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      numUsers: 0
    };
  }

  componentDidMount() {
    //creates and binds the websocket to App
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onopen = function(event) {
      console.log('CLIENT CONNECTED');
    };

    //handles any incoming messages with own function
    this.ws.onmessage = this.handleMessage;
  }

  render() {
    return (
      <Fragment>
        <NavBar numUsers={this.state.numUsers} />
        <MessageList messageList={this.state.messages} />
        <ChatBar addMessage={this.addMessage} changeUsername={this.changeUsername} currentUser={this.state.currentUser} />
      </Fragment>
    );
  }

  //sends new message to server
  addMessage = message => {
    message.type = 'new-message';

    let outgoingMessage = {
      type: 'new-message',
      username: message.username,
      content: message.content
    };
    console.log('Sending: ' + JSON.stringify(outgoingMessage));
    this.ws.send(JSON.stringify(outgoingMessage));
  };

  //sends new username to server
  changeUsername = (username, prevUsername) => {
    //sets username, sends to server
    let outgoingMessage = {
      type: 'change-username',
      username: username,
      prevUsername: prevUsername
    };
    console.log('Sending: ' + JSON.stringify(outgoingMessage));
    this.ws.send(JSON.stringify(outgoingMessage));

    this.setState({ currentUser: { name: username } });
  };

  handleMessage = event => {
    let incomingMessage = JSON.parse(event.data);
    console.log('Incoming Message: ' + event.data);
    let newMessageList = [];
    let numUsers;

    switch (incomingMessage.type) {
      case 'change-username': //if change username or new messages received
      case 'new-message':
        newMessageList = [...this.state.messages, incomingMessage];
        this.setState({ messages: newMessageList });
        break;
      case 'user-change': //if a user had connected/disconnected
        numUsers = incomingMessage.numUsers;
        this.setState({ numUsers: numUsers });
        break;
      case 'current-messages': //handles incoming initial messages payload
        this.setState({ messages: incomingMessage.messageList });
        break;
      default:
        break;
    }
    window.scrollTo(0, document.body.scrollHeight); //scroll to bottom of page for any new messages
  };
}

export default App;
