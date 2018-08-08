import React, { Component, Fragment } from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var ws = new WebSocket('ws://localhost:3001');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: null }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Cats',
          content: 'Has anyone seen my marbles?',
          id: 'Cats'
        },
        {
          username: null,
          content: 'No, I think you lost them. You lost your marbles Cats. You lost them for good.',
          id: 'Dogs'
        }
      ]
    };
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message) {
    //constructs message object from chatbar
    let newMessage = Object.assign({}, message);
    newMessage.id = new Date().toString(); //temp hardcoded id
    let currMessageList = this.state.messages.slice();
    currMessageList.push(newMessage);

    //handles any username changes if any
    let currentUser = message.username ? { name: message.username } : { name: null };

    ws.send(JSON.stringify(message));

    this.setState({ currentUser, messages: currMessageList });
  }

  componentDidMount() {
    ws.onopen = function(event) {
      console.log('CLIENT CONNECTED');
    };

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 'Alpacas', username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
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
}

export default App;
