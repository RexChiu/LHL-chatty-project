import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Catty
        </a>
        <span className="user-count">{this.props.numUsers} Cats online</span>
      </nav>
    );
  }
}
export default NavBar;
