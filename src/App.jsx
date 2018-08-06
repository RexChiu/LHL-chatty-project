import React, { Component, Fragment } from 'react';

import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';

class App extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <Messages />
        <ChatBar />
      </Fragment>
    );
  }
}
export default App;
