import React, { Component } from 'react';

class Message extends Component {
  render() {
    let username = this.props.message.username ? this.props.message.username : 'AnonyCats';
    let inlineStyle = {
      color: this.props.message.color
    };

    let content = formatContent(this.props.message.content);

    return (
      <div className="message">
        <span className="message-username" style={inlineStyle}>
          {username}
        </span>

        <span className="message-content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}
export default Message;

function formatContent(content) {
  let wordArr = content.split(' ');

  for (let i = 0; i < wordArr.length; i++) {
    if (wordArr[i].includes('.jpg') || wordArr[i].includes('.png') || wordArr[i].includes('.gif')) {
      wordArr[i] = `<img src=${wordArr[i]} width="60%"/>`;
    }
  }

  return wordArr.join(' ');
}
