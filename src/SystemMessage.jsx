import React, { Component } from 'react';

class SystemMessage extends Component {
  render() {
    return (
      <div className="message system">
        <span className="notification-content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default SystemMessage;
