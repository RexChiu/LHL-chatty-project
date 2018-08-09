import React from 'react';

function Message(props) {
  //sets default username if not defined
  let username = props.message.username ? props.message.username : 'AnonyCats';
  //colors the username to be what the server says
  let inlineStyle = {
    color: props.message.color
  };

  //sends message content to be formatted
  let content = formatContent(props.message.content);

  return (
    <div className="message">
      <span className="message-username" style={inlineStyle}>
        {username}
      </span>
      {/* since the image tags are dynamically generated, have to override react's automatic tag escaping */}
      <span className="message-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
export default Message;

//finds all instances of an image in the string, and puts a html image tag around it
function formatContent(content) {
  let wordArr = content.split(' ');

  for (let i = 0; i < wordArr.length; i++) {
    if (wordArr[i].includes('.jpg') || wordArr[i].includes('.png') || wordArr[i].includes('.gif')) {
      wordArr[i] = `<img src=${wordArr[i]} width="60%"/>`;
    }
  }

  return wordArr.join(' ');
}
