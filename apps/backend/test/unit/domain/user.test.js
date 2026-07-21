import { InvalidPasswordError, NullOrEmptyUsernameError } from '#models/productModels/errors/index.ts';
import { userWithCorrectData, userWithEmptyUsername, userWithWrongPassword } from './substructure/userFactory.js';
import '#unittest/domain/substructure/userTestExtends.js';

test('throw invalid password error when creating a user with not correct password', () => {
  expect(() => userWithWrongPassword()).toThrow(InvalidPasswordError);
});

test('throw null or empty username error when creating a user with null or empty username', () => {
  expect(() => userWithEmptyUsername()).toThrow(NullOrEmptyUsernameError);
});

test('throw invalid password error when change password to not correct password', () => {
  const user = userWithCorrectData();

  expect(() => {
    user.password = '123';
  }).toThrow(InvalidPasswordError);
});

test('throw null or empty username error when change username to empty username', () => {
  const user = userWithCorrectData();

  expect(() => {
    user.username = '';
  }).toThrow(NullOrEmptyUsernameError);
});

test('successful creating user with correct username and password', () => {
  const exceptedUser = {
    username: 'ali',
  };

  expect(() => userWithCorrectData()).toCheckUserPass();
});
