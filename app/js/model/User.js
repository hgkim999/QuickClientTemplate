/**
 * User Model Class
 *
 * @flow
 */

export type UserType = {
  fbID: string,
  firstName: string,
  middleName: string,
  lastName: string,
  nickName: string,
}

export default class User {
  fbID: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;

  getFBID(): string {
    return this.fbID;
  }

  getFullName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName} (${this.nickName})`;
  }
}
