import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.name,
      content: null
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
  }

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      console.log('Enter!');
    }
  }

  handleChangeUsername(event) {
    console.log(event.target.value);
    this.setState({
      username: event.target.value
    });
  }

  handleChangeContent(event) {
    console.log(event.target.value);
    this.setState({
      content: event.target.value
    });
  }

  render() {
    const currentUser = this.props.currentUser;
    const currentName = currentUser.name;
    return (
      <footer className="chatbar">
        <form>
          <input className="chatbar-username" onChange={this.handleChangeUsername} defaultValue={currentName} placeholder="Your Name (Optional)" />
        </form>
        <input className="chatbar-message" onChange={this.handleChangeContent} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;
