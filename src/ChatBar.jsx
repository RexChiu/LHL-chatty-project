import React, { Component } from 'react';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Test'
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      //grabs the event, and its classname
      let eventTarget = event.target;
      let eventName = eventTarget.className;

      //handles username entry, grabs username
      if (eventName === 'chatbar-username') {
        let usernameElem = event.target.value;

        console.log('Username: ' + usernameElem);
      } else if (eventName === 'chatbar-message') {
        //handles message entry, grabs username and message
        let messageElem = event.target.value;
        let usernameElem = event.target.previousElementSibling.value;

        console.log('Username: ' + usernameElem);
        console.log('Message: ' + messageElem);
        event.target.value = '';
      }
    }
  }

  render() {
    const currentUser = this.props.currentUser;
    const currentName = currentUser.name;
    return (
      <footer onKeyPress={this._handleKeyPress} className="chatbar">
        <input className="chatbar-username" defaultValue={currentName} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default Messages;
