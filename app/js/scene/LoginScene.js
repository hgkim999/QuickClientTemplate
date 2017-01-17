/**
 * LoginScene.js
 *
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Navigator,
  Image,
} from 'react-native';
import FBLoginButton from 'QuickClientTemplate/app/js/ui/FBLoginButton';
import CredentialHelper from 'QuickClientTemplate/app/js/helper/CredentialHelper';
import NavigationHelper from 'QuickClientTemplate/app/js/helper/NavigationHelper';

export default class LoginScene extends Component {

  static propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object.isRequired,
    navigationHelper: PropTypes.object.isRequired,
  }

  static defaultProps: {
    title: 'Login Scene',
  }

  constructor(props : any[]) {
    super(props);
  }

  async isLoggedIn() {
    const {navigationHelper} = this.props;

    let token = await CredentialHelper.getTokenAsync();
    // Skip LoginScene if the user is already logged in
    if (token) {
      navigationHelper.navigateTo('LandingScene');
    }
  }

  componentWillMount() {
    this.isLoggedIn().done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={require('QuickClientTemplate/app/assets/img/login.jpg')}/>
        <Text style={styles.welcome}>Welcome to Quick Client Template!</Text>
        <LoginButton
          publishPermissions={['publish_actions']}
          readPermissions={[
            'user_friends',
            'email',
            'user_work_history',
            'public_profile',
          ]}
          onLoginFinished={(error, result) => {
            if (error) {
              alert("Login failed");
              console.error(error);
            } else if (result.isCancelled) {
              alert("Please Log in to continue");
            } else {
              this.props.navigationHelper.navigateTo('LandingScene');
            }
          }}
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    margin: 15
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: -100,
  },
});
