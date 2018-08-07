import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.name,
      content: null
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.state.content === null) {
        return;
      }

      let message = {
        username: this.state.username,
        content: this.state.content
      };

      this.props.addMessage(message);

      // clears content from state and DOM
      event.target.closest('footer').getElementsByClassName('chatbar-message')[0].value = '';
      this.setState({ content: null });
    }
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value.trim()
    });
  }

  handleChangeContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    return (
      <footer onKeyPress={this.handleKeyPress} className="chatbar">
        <form>
          <input className="chatbar-username" onChange={this.handleChangeUsername} defaultValue={this.state.username} placeholder="Your Name (Optional)" />
        </form>
        <input className="chatbar-message" onChange={this.handleChangeContent} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;
