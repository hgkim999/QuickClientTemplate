/**
 * @flow
 */

import CredentialHelper from 'QuickClientTemplate/app/js/helper/CredentialHelper';

import React, {Component, PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  View,
} from 'react-native';
import {LoginButton} from 'react-native-fbsdk';


export default class LandingScene extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    navigationHelper: PropTypes.object.isRequired,
  }

  constructor(props: any) {
    super(props);
  }

  static defaultProps : {
    title: 'Landing Scene',
  }

  async checkLoginToken() {
    try {
      let token = await CredentialHelper.getTokenAsync();
      if(token) {
        alert(`Current User ID: ${token.userID}`);
      }
    } catch (error) {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Your Login was successful!</Text>
        <Text style={styles.welcome}>Let's start creating your first landing scene!</Text>
        <Button
          title="Check Login Token"
          onPress={this.checkLoginToken}/>
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
            } else {}
          }}
          onLogoutFinished={() => {
            alert("User logged out");
            this.props.navigationHelper.navigateTo('LoginScene');
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
