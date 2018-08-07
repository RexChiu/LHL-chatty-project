import React, { Component } from 'react';

class Message extends Component {
  render() {
    let username = this.props.message.username ? this.props.message.username : 'AnonyCats';

    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;
