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
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onopen = function(event) {
      console.log('CLIENT CONNECTED');
    };

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
      case 'change-username':
        newMessageList = [...this.state.messages, incomingMessage];
        this.setState({ messages: newMessageList });
        break;
      case 'new-message':
        newMessageList = [...this.state.messages, incomingMessage];
        this.setState({ messages: newMessageList });
        break;
      case 'user-change':
        numUsers = incomingMessage.numUsers;
        this.setState({ numUsers: numUsers });
        console.log(numUsers + ' Cats online.');
        break;
      default:
        break;
    }
  };
}

export default App;
