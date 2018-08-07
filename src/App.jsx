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
          content: 'Has anyone seen my marbles?'
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Cats. You lost them for good.'
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList />
        <ChatBar currentUser={this.state.currentUser} />
      </Fragment>
    );
  }
}

export default App;
