/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import FBSDK, { LoginButton } from 'react-native-fbsdk';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

type FBAccessTokenMap = {
  accessToken: string,
  applicationID: string,
  userID: string,
  permissions: Array<string>,
  declinedPermissions: Array<string>,
  accessTokenSource?: string,
  expirationTime: number,
  lastRefreshTime: number,
};

export default class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={[
            "publish_actions",
          ]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.toString());
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                let permissions = result.grantedPermissions ? result.grantedPermissions.toString() : 'none';
                console.log(result);
                console.log("Login was successful with permissions: " + permissions);
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('FBLoginButton', () => FBLoginButton);
