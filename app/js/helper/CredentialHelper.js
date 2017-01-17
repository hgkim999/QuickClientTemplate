/**
 * CredentialHelper.js
 *
 * Wrapper class for credential related functions
 *
 * @flow
 */
import FBSDK, {AccessToken} from 'react-native-fbsdk';
import AppSettings from 'QuickClientTemplate/app/constants/AppSettings.json';

export default class CredentialHelper {

  /*
   * get the current access token on the device
   * @param success
   * @param error
   */
  static getToken(success : Function, error : Function) {
    AccessToken.getCurrentAccessToken().then((token) => {
      success(token);
    }).catch((reason) => {
      error(reason);
    });
  }

  /*
   * get the current access token on the device
   * es7 async syntax version
   */
  static async getTokenAsync() {
    try {
      let token = await AccessToken.getCurrentAccessToken();
      return token;
    } catch (error) {
      return null;
    }
  }

  /*
   * Validate the current token with the server
   */
  static async validateCurrentTokenAsync() {
    let validate_url = AppSettings.credentialEndpoint;

    try{
      let client_token = await this.getTokenAsync();
      let access_token =  client_token ? client_token.accessToken: undefined;
      let user_id = client_token ? client_token.userID: undefined;
      let application_id = client_token ? client_token.applicationID: undefined;

      try {
        let _body = JSON.stringify({
          'access-token': access_token,
          'user-id': user_id,
          'application-id': application_id,
        });

        let response = await fetch(validate_url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'FB-Access-Token': access_token,
          },
          body: _body,
        });
        let responseJson = await response.json();

        return responseJson;
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log('Failed to get Current Client Token!');
    }
  }

  /*
   * This function does not validate the FB User Token.
   * To test local FB Login SDK Only
   */
  static async validateTokenFakeAsync() {
    let response = await setTimeout(() => {}, 500);

    return {
      is_valid: true,
      user_id: 123098712,
    };
  }
}
