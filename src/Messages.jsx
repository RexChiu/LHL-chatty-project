import React from 'react';

import Message from './Message.jsx';

class Messages extends React.Component {
  render() {
    return (
      //<React.Fragment>
      <span>
        <Message />
        <Message />
      </span>
      //</React.Fragment>
    );
  }
}
export default Messages;
