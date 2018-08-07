import React, { Component } from 'react';

class Messages extends Component {
  render() {
    const currentUser = this.props.currentUser;
    const currentName = currentUser.name;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={currentName} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default Messages;
