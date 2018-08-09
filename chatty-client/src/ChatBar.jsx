import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.name,
      prevUsername: this.props.currentUser.name,
      content: null
    };
  }

  //captures enter key
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      //if enter came from username input, send to app
      if (event.target.className === 'chatbar-username') {
        this.props.changeUsername(this.state.username, this.state.prevUsername);
        this.setState({ prevUsername: this.state.username });
      } else if (!this.state.content) {
        //ignores if content bar is empty
        return;
      } else {
        //catches any sudden username changes
        if (this.state.username !== this.state.prevUsername) {
          this.props.changeUsername(this.state.username, this.state.prevUsername);
          this.setState({ prevUsername: this.state.username });
        }
        //sends message to server
        let message = {
          username: this.state.username ? this.state.username : null,
          content: this.state.content
        };
        this.props.addMessage(message);
        // clears content from state and DOM
        event.target.closest('footer').getElementsByClassName('chatbar-message')[0].value = '';
        this.setState({ content: null });
      }
    }
  };

  //controlled input for username
  handleChangeUsername = event => {
    this.setState({
      username: event.target.value.trim()
    });
  };

  //controlled input for content
  handleChangeContent = event => {
    this.setState({
      content: event.target.value.trim()
    });
  };

  render() {
    return (
      <footer onKeyPress={this.handleKeyPress} className="chatbar">
        <input className="chatbar-username" onChange={this.handleChangeUsername} defaultValue={this.state.username} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onChange={this.handleChangeContent} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;
