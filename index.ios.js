import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button, SocialIcon } from 'react-native-elements'

import Login from 'react-native-login';

const config = {
  url: 'https://auth.no-mad.net/auth',
  realm: 'ReactAppRealm',
  client_id: 'reactapp',
  redirect_uri: 'https://success.no-mad.net/success.html',
  appsite_uri: 'https://app.no-mad.net/app.html',
  kc_idp_hint: 'facebook',
};

export default class LoginExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: null,
    };
  }

  componentWillMount() {
    Login.tokens().then(tokens => this.setState({tokens})).catch(() => this.setState({tokens: null}));
  }

  onLogin() {
    Login.start(config).then(tokens => {
      this.setState({tokens: tokens});
    }).catch(() => this.setState({tokens: null}));
  }

  onLogout() {
    Login.end();
    this.setState({tokens: null});
  }

  render() {
    return this.state.tokens ? this.renderAppScreen() : this.renderLoginScreen();
  }

  renderAppScreen() {
    const details = Login.decodeToken(this.state.tokens.id_token);

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.text}>Welcome!</Text>
          <Text style={styles.text}>{details.name}</Text>
          <Text style={styles.text}>{details.email}</Text>
        </View>
        <Button borderRadius={30} backgroundColor="#5cb85c" title='Logout' onPress={() => this.onLogout()} />
      </View>
    );
  }

  renderLoginScreen() {
    return (
      <View style={styles.container}>
        <SocialIcon title='Sign In With Facebook' button type='facebook' onPress={() => this.onLogin()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 32,
  },
});

AppRegistry.registerComponent('LoginExample', () => LoginExample);
