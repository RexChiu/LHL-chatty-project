import React, { Component, Fragment } from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Cats' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Cats',
          content: 'Has anyone seen my marbles?',
          id: 'Cats'
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Cats. You lost them for good.',
          id: 'Dogs'
        }
      ]
    };
  }

  componentDidMount() {
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
            Chatty
          </a>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} />
      </Fragment>
    );
  }
}

export default App;
