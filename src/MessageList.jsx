import React, { Component, Fragment } from 'react';

import Message from './Message.jsx';

class Messages extends Component {
  render() {
    return (
      <Fragment>
        <Message />
        <Message />
      </Fragment>
    );
  }
}
export default Messages;
