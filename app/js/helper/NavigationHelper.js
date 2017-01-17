/**
 * NavigationHelper.js
 * Simplifies navigation functions, constain scenes data
 *
 * @flow
 */

import { Component } from 'react';
import { Navigator } from 'react-native';
import LoginScene from 'QuickClientTemplate/app/js/scene/LoginScene';
import LandingScene from 'QuickClientTemplate/app/js/scene/LandingScene';

export default class NavigationHelper {
  navigator: Navigator;
  scenes: Object;

  constructor(_navigator: Navigator) {
    this.navigator = _navigator;
    this.scenes = {
      LoginScene: LoginScene,
      LandingScene: LandingScene,
    }
    this.navigateTo = this.navigateTo.bind(this);
  }

  setNavigator(_navigator: Navigator) {
    this.navigator = _navigator;
  }

  getScenes(): Object {
    return this.scenes;
  }

  navigateTo = (name: string, type: string ='Default') => {
    if (!this.scenes[name]) {
      console.log(`Could not find scene ${name}!`);
      return;
    }

    this.navigator.push({
      component: this.scenes[name],
      passProps: {
        name: name,
        navigator: this.navigator,
      },
      type: type,
    });
  }
}
