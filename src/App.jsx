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
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser} />
      </Fragment>
    );
  }

  addMessage(message) {
    //constructs message object from chatbar
    let newMessage = Object.assign({}, message);
    newMessage.id = new Date().toString(); //temp hardcoded id
    let currMessageList = this.state.messages.slice();
    currMessageList.push(newMessage);

    //handles any username changes if any
    let currentUser = message.username ? { name: message.username } : { name: null };

    this.ws.send(JSON.stringify(message));

    this.setState({ currentUser, messages: currMessageList });
  }

  handleMessage(event) {
    let incomingMessage = JSON.parse(event.data);
    console.log('Incoming Message: ' + JSON.stringify(incomingMessage));
    let newMessageList = [...this.state.messages, incomingMessage];
    console.log(newMessageList);
    this.setState({ messages: newMessageList });
  }
}

export default App;
