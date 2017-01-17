/**
 * app.js
 * Main app controller
 * Initialize navigator, and assign the first scene to navigate.
 *
 * @flow
 */

import LoginScene from 'QuickClientTemplate/app/js/scene/LoginScene';
import CredentialHelper from 'QuickClientTemplate/app/js/helper/CredentialHelper';
import NavigationHelper from 'QuickClientTemplate/app/js/helper/NavigationHelper';

import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';

let navigationHelper = new NavigationHelper();

export default class QuickClientTemplate extends Component {

  renderScene(route: Object, navigator: Navigator) {
    let RouteComponent = route.component;
    navigationHelper.setNavigator(navigator);

    return <RouteComponent
      navigator={navigator}
      navigationHelper={navigationHelper}
      {...route.passProps}
           />;
  }

  // Animations settings by scene type
  configureScene(route: Object, routeStack: any) {
    switch (route.type) {
      case 'Modal':
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.PushFromRight;
    }
  }

  _navigateTo(name: string, type: string = 'Default') {
    navigationHelper.navigateTo(name, type);
  }

  render() {
      return (
        <Navigator
          initialRoute={{ component: LoginScene }}
          renderScene={this.renderScene}
          navigateTo={this._navigateTo}
          configureScene={this.configureScene}
        />
      );
    }
}
