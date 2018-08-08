import React, { Component, Fragment } from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: null }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  componentDidMount() {
    let ws = new WebSocket('ws://localhost:3001');
    this.ws = ws;
    this.ws.onopen = function(event) {
      console.log('CLIENT CONNECTED');
    };

    this.ws.onmessage = this.handleMessage;
  }

  render() {
    return (
      <Fragment>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Catty
          </a>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar addMessage={this.addMessage} changeUsername={this.changeUsername} currentUser={this.state.currentUser} />
      </Fragment>
    );
  }

  //sends new message to server
  addMessage(message) {
    //handles any username changes if any
    if (this.state.currentUser.name != message.username) {
      console.log(`Username changed! Old: ${this.state.currentUser.name} New: ${message.username}`);
      this.changeUsername(message.username);
    }
    message.type = 'new-message';

    let outgoingMessage = {
      type: 'new-message',
      username: message.username,
      content: message.content
    };
    console.log('Sending: ' + JSON.stringify(outgoingMessage));
    this.ws.send(JSON.stringify(outgoingMessage));
  }

  //sends new username to server
  changeUsername(username) {
    //sets username, sends to server
    let outgoingMessage = {
      type: 'change-username',
      username: username
    };
    console.log('Sending: ' + JSON.stringify(outgoingMessage));
    this.ws.send(JSON.stringify(outgoingMessage));

    this.setState({ currentUser: username });
  }

  handleMessage(event) {
    let incomingMessage = JSON.parse(event.data);
    console.log('Incoming Message: ' + event.data);

    switch (incomingMessage.type) {
      case 'change-username':
        console.log('username message');
        break;
      case 'new-message':
        let newMessageList = [...this.state.messages, incomingMessage];
        this.setState({ messages: newMessageList });
        break;
      default:
        break;
    }
  }
}

export default App;
