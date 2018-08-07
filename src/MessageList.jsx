import React, { Component, Fragment } from 'react';

import Message from './Message.jsx';

class Messages extends Component {
  render() {
    let messages = this.props.messageList.map(message => {
      return <Message key={message.id} message={message} />;
    });

    return <Fragment>{messages}</Fragment>;
  }
}
export default Messages;
