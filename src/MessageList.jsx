import React, { Fragment } from 'react';

import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

function Messagelist(props) {
  let messages = props.messageList.map(message => {
    if (message.type == 'new-message') {
      return <Message key={message.id} message={message} />;
    } else {
      return <SystemMessage key={message.id} message={message} />;
    }
  });

  return <Fragment>{messages}</Fragment>;
}
export default Messagelist;
