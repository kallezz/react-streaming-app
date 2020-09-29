import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <Menu stackable inverted attached>
      <Menu.Item
        as={Link}
        to="/"
        icon={'twitch'}
      />
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/"
          name='streams'
        >
          Streams
        </Menu.Item>
        <GoogleAuth/>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;