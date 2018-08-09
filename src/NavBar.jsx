import React from 'react';

function NavBar(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        Catty
      </a>
      <span className="user-count">
        {props.numUsers} Cat
        {/*adds s if more than 1 user*/}
        {props.numUsers > 1 && 's'} online
      </span>
    </nav>
  );
}
export default NavBar;
