import React from 'react';

import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx';

class App extends React.Component {
  render() {
    return (
      //<React.Fragment>
      <span>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <Messages />
        <ChatBar />
      </span>
      //</React.Fragment>
    );
  }
}
export default App;
