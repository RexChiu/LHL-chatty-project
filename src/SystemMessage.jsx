import React from 'react';

function SystemMessage(props) {
  return (
    <div className="message system">
      <span className="notification-content">{props.message.content}</span>
    </div>
  );
}
export default SystemMessage;
