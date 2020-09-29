import React, {Component} from 'react';
import {Icon, Loader, Menu} from "semantic-ui-react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '545059326014-it66vo4c4tkm4ib57gv6h1sole689t06.apps.googleusercontent.com',
        scope: 'email'
      })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return <Menu.Item
        link
        name='googleSignIn'
      >
        <Icon name="google"/>
        <Loader inverted active inline size="mini" />
      </Menu.Item>;
    } else if (this.props.isSignedIn) {
      return <Menu.Item
        link
        onClick={this.onSignOutClick}
        name='googleSignIn'
      >
        <Icon name="google"/>
        Sign Out
      </Menu.Item>;
    } else {
      return <Menu.Item
        link
        onClick={this.onSignInClick}
        name='googleSignIn'
      >
        <Icon name="google"/>
        Sign In with Google
      </Menu.Item>;
    }
  };

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
};

export default connect(mapStateToProps, {
  signIn,
  signOut
})(GoogleAuth);